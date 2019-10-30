/**
 * @fileoverview Coin agnostic transaction manager (tx history, sending, receiving)
 * @author Gabriel Womble
 */
import { BlockchainManager } from 'coins';

export class TransactionManager {
  constructor(manager) {
    this.manager = manager;
    this.blockchainManager = BlockchainManager;
  }

  async getPendingBalance({ amount, sender_address }) {
    const currentBalance = await this.manager.databaseManager.getBalanceByAddress(sender_address);

    return (parseFloat(currentBalance) - parseFloat(amount)).toFixed(4);
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

    const pending_balance = await this.getPendingBalance({ amount, sender_address });

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
