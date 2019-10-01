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
 * Function to get a addresses from db by wallet ID
 * @param {Object} manager - the manager object
 * @param {func} setFn - function that sets the res to state
 * @param {number} id - id of wallet to get
 */
  async getAddressesByWalletId(setFn, id) {
    return await manager.databaseManager.getAddressesByWalletId(id);
  }

  /**
   * Function that generates deterministic pass phrase
   * @returns {Array} - Secret Phrase
   * @param {string} - locale code to determine wordlist to use
   */
  generateSecretPhrase(locale) {
    return this.blockchainManager.phraseToArray(this.blockchainManager.generateSecretPhrase(locale));
  }

  /**
 * Function to search a transaction by description
 * @param {func} setFn - the function that sets the query response to state
 * @param {string} value - the value to query
 */
  async  searchTransactionsByValue(addresses, value, filterDate) {
    return await manager.databaseManager.searchTransactionsForValue(addresses, value, filterDate);
  }

  /**
 * Function to get transactions to display on wallet chart
 * @param {string} address - the address value to query
 * @param {object} filterDate - date to filter transaction data
 */
  async getTransactionsPerAddressAfterDate(address, filterDate) {
    return await manager.databaseManager.getTransactionsPerAddressAfterDate(address, filterDate);
  }
}

export default new WalletManager();
