/**
 * @fileoverview Coin agnostic wallet actions
 * @author Gabriel Womble
 */
import { BLOCKCHAIN_MANAGERS } from 'api/blockchain';
import { getManagerKey } from 'api/blockchain/utils';
import { manager } from 'app';

class WalletManager {
  constructor() {
    this.manager = manager;
  }

  /**
   * @returns {Class} blockchainManager class to use
   * @param {number} coinId - used to determine which manager to use
   */
  getBlockchainManager(coinId) {
    const managerKey = getManagerKey(coinId);
    return BLOCKCHAIN_MANAGERS[managerKey];
  }

  /**
   * Function that adds a new wallet to the db
   * @param {Object} wallet - the wallet object to add to the db
   */
  async createWallet(wallet) {
    await this.manager.databaseManager.insert(false).wallet(wallet);
    const blockchainManager = this.getBlockchainManager(wallet.coin_id);
    const { address, privateKey: private_key } = blockchainManager.generateAddressFromSeed(wallet.seed);
    const insertedWallet = await this.manager.databaseManager.getLastWallet();

    await this.manager.databaseManager.insert().address({
      address,
      private_key,
      wallet_id: insertedWallet.id,
    });

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
  generateSecretPhrase(coinId) {
    const blockchainManager = this.getBlockchainManager(coinId);
    return blockchainManager.phraseToArray(blockchainManager.generateSecretPhrase());
  }
}

export default new WalletManager();
