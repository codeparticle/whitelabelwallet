/**
 * @fileoverview Coin agnostic transaction manager (tx history, sending, receiving)
 * @author Gabriel Womble
 */
import { BlockchainManager, manager } from 'app';

class TransactionManager {
  constructor() {
    this.manager = manager;
    this.blockchainManager = BlockchainManager;
  }

  async createTransaction({ fromAddress, toAddress, amount, memo, type = 'send' }) {
    const privateKey = await this.manager.databaseManager.getPrivKeyFromAddress(fromAddress);
    const txParams = {
      amount,
      fromAddress,
      toAddress,
      privateKey,
      memo,
      type,
    };

    // TODO WLW-161: Implement send funds blockchain logic
    console.log('Transaction created: ', txParams);
  }
}

export default new TransactionManager();