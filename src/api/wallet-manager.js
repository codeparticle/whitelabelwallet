/**
 * @fileoverview Coin agnostic wallet actions
 * @author Gabriel Womble
 */
import { BlockchainManager, manager } from 'app';

class WalletManager {
  constructor() {
    this.manager = manager;
    this.blockchainManager = BlockchainManager;
  }

  /**
   * Function that adds a new wallet to the db
   * @param {Object} wallet - the wallet object to add to the db
   */
  async createWallet(wallet) {
    await this.manager.databaseManager.insert(false).wallet(wallet);
    const { address, privateKey: private_key } = this.blockchainManager.generateAddressFromSeed(wallet.seed);
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
   * @param {string} - locale code to determine wordlist to use
   */
  generateSecretPhrase(locale) {
    return this.blockchainManager.phraseToArray(this.blockchainManager.generateSecretPhrase(locale));
  }
}

export default new WalletManager();
