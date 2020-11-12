/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
/**
 * @fileoverview Coin agnostic transaction manager (tx history, sending, receiving)
 * @author Gabriel Womble
 */
import { BlockchainManager } from 'coins';
import { GENERAL } from 'lib/constants';
import { getTimestamp } from 'lib/utils';

const { TRANSACTION_TYPES: { SEND, RECEIVE } } = GENERAL;

export class TransactionManager {
  constructor(manager) {
    this.manager = manager;
    this.blockchainManager = BlockchainManager;
  }

  /**
   * Function that updates or inserts incoming transactions detected
   * by the polling services
   * @param {Array} transactions
   * @param {Object} addressObj
   */
  updateIncomingTransactions(transactions, addressObj) {
    const { address, id } = addressObj;

    transactions.forEach(async (transaction) => {
      const { sender_address, receiver_address } = transaction;

      // Ignore transaction change
      if (sender_address === receiver_address) {
        return;
      }

      const transaction_type = transaction.sender_address === address
        ? SEND
        : RECEIVE;

      this.manager.databaseManager.updateOrInsertTransactionByTxId({
        ...transaction,
        receiver_address_id: id,
        transaction_type,
      });
    });
  }

  async createTransaction({
    amount,
    fee,
    fromAddress: sender_address,
    toAddress: receiver_address,
    memo: description,
    type: transaction_type = 'send',
  }) {
    const privateKey = await this.manager.databaseManager.getPrivKeyFromAddress(sender_address);
    const {
      sender_address_id,
      receiver_address_id,
    } = await this.manager.databaseManager.getTxAddressIds(sender_address, receiver_address);

    const txParams = {
      amount,
      description,
      created_date: getTimestamp(),
      fee,
      privateKey,
      receiver_address_id,
      receiver_address,
      sender_address_id,
      sender_address,
      transaction_type,
    };

    const res = await this.blockchainManager.sendFromOneAddress({
      fee: parseInt(fee),
      fromAddress: sender_address,
      privateKey,
      paymentData: [{
        address: receiver_address,
        amount,
      }],
    });

    let finalTx = {};

    if (res.error === false) {
      await this.manager.databaseManager.insert().transaction(txParams);
      await this.manager.saveDatabase();
      finalTx = await this.manager.databaseManager.getLastTransaction();
    }


    return {
      ...res,
      ...finalTx,
    };
  }
}
