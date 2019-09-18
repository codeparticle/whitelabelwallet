/**
 * @fileoverview Coin agnostic wallet actions
 * @author Gabriel Womble
 */
import { BlockchainManager } from 'api/mock-blockchain/blockchain';
import { manager } from 'app';

class WalletManager {
  constructor() {
    this.manager = manager;
  }

  /**
   * Function that will accept a coinId as parameter
   * to determine which coin's manager to use
   * For now, just mocking functionality
   */
  getBlockchainManager() {
    return BlockchainManager;
  }

  /**
   * Function that adds a new wallet to the db
   * @param {Object} wallet - the wallet object to add to the db
   */
  async createWallet(wallet) {
    await this.manager.databaseManager.insert().wallet(wallet);
    await this.manager.saveDatabase();
  }

  /**
   * Function that returns all Wallets from DB
   * @returns {Array} - all wallets
   */
  async fetchWallets() {
    return await this.manager.databaseManager.getWallets();
  }

  /**
   * Gets a single wallet by id
   * @returns {Object} - wallet
   * @param {number} id - wallet's id
   */
  async getWalletById(id) {
    return await this.manager.databaseManager.getWalletById(id);
  }

  /**
   * Function that updates a wallet by its Id
   * @param {Object} wallet - contains wallet's id and properties to update
   */
  async updateWalletbyId(wallet) {
    await this.manager.databaseManager.updateWalletById(wallet.id, wallet);
    await this.manager.saveDatabase();
  }

  /**
   * Function that generates deterministic pass phrase
   * @returns {Array} - Secret Phrase
   * @param {number} - coinId to determine type coin's blockchainManager
   */
  generateSecretPhrase(coinId = 0) {
    const blockchainManager = this.getBlockchainManager(coinId);

    return blockchainManager.phraseToArray(blockchainManager.generateSecretPhrase());
  }
}

export default new WalletManager();
