/**
 * @fileoverview Coin agnostic transaction manager (tx history, sending, receiving)
 * @author Gabriel Womble
 */
import { BlockchainManager } from 'coins';
import { GENERAL } from 'lib/constants';

const { TRANSACTION_TYPES: { RECEIVE } } = GENERAL;

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
      const { amount, transaction_type: type } = transaction;
      const convertedAmount = -Math.abs(amount);
      const pending_balance = await this.getPendingBalance({
        amount: convertedAmount,
        address,
        type,
      });

      this.manager.databaseManager.updateOrInsertTransactionByTxId({
        ...transaction,
        receiver_address_id: id,
        transaction_type: RECEIVE,
        pending_balance,
      });
    });
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
      const { amount } = transaction;
      const convertedAmount = -Math.abs(amount);
      const pending_balance = await this.getPendingBalance({
        amount: convertedAmount,
        sender_address: address,
      });

      this.manager.databaseManager.updateOrInsertTransactionByTxId({
        ...transaction,
        receiver_address_id: id,
        transaction_type: RECEIVE,
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
      sender_address,
      sender_address_id,
      receiver_address,
      receiver_address_id,
      pending_balance,
      privateKey,
      description,
      transaction_type,
    };

    await this.manager.databaseManager.insert().transaction(txParams);

    // TODO WLW-161: Implement send funds blockchain logic
    console.log('Transaction created: ', txParams);

    return await this.manager.databaseManager.getLastTransaction();
  }
}
