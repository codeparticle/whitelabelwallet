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

  async getPendingBalance({ amount, address, type }) {
    const currentBalance = await this.manager.databaseManager.getBalanceByAddress(address);
    const pendingBalance = type === RECEIVE
      ? parseFloat(currentBalance) + parseFloat(amount)
      : parseFloat(currentBalance) - parseFloat(amount);

    return pendingBalance.toFixed(4);
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
      const { amount, sender_address, receiver_address } = transaction;

      // Ignore transaction change
      if (sender_address === receiver_address) {
        return;
      }

      const convertedAmount = Math.abs(amount);
      const transaction_type = transaction.sender_address === address
        ? SEND
        : RECEIVE;

      const pending_balance = await this.getPendingBalance({
        amount: convertedAmount,
        address: address,
        type: transaction_type,
      });

      const transaction_type = transaction.sender_address === address
        ? SEND
        : RECEIVE;

      this.manager.databaseManager.updateOrInsertTransactionByTxId({
        ...transaction,
        receiver_address_id: id,
        transaction_type,
        pending_balance,
      });
    });
  }

  async createTransaction({
    fromAddress: sender_address,
    toAddress: receiver_address,
    amount,
    memo: description,
    type: transaction_type = 'send',
  }) {
    const privateKey = await this.manager.databaseManager.getPrivKeyFromAddress(sender_address);
    const {
      sender_address_id,
      receiver_address_id,
    } = await this.manager.databaseManager.getTxAddressIds(sender_address, receiver_address);

    const pending_balance = await this.getPendingBalance({ amount, address: sender_address, type: transaction_type });

    const txParams = {
      amount,
      description,
      created_date: getTimestamp(),
      pending_balance,
      privateKey,
      receiver_address_id,
      receiver_address,
      sender_address_id,
      sender_address,
      transaction_type,
    };

    const res = await this.blockchainManager.sendFromOneAddress({
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
