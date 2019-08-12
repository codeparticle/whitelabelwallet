const required = () => {
  throw new Error('Implement Method')
  ;
};

class BlockchainManager {

  // This class instance is always fetched using "BlockchainManager.instance"
  static get instance() {
    if (!this._instance) {
      this._instance = new BlockchainManager();
    }
    return this._instance;
  }

  // Used to reset a "BlockchainManager.instance"
  static resetInstance() {
    this._instance = null;
  }

  /**
   * This function is used to get the information about a particular Address.
   * @param {string} addressParam
   * @return {Promise} Will return a promise that resolves with the address details
  */
  getAddressDetails = required;

  /**
   * This function is used to get all the available transactions.
   * @return {Promise} Will return a promise that resolves with an Array of Transactions
*/
  getTransactions = required;

  /**
   * This function is used to get the information about a particular Transaction.
   * @param {string} txid
   * @return {Promise} Will return a promise that resolves with the Transaction details
*/
  getTransactionDetails = required;

  /**
   * This get the balance of a particular address
   * @param {string} address
   * @param {array} Array of unspentTxOuts
   * @return {Promise} Will return a promise that resolves with the number balance associated to an address.
*/
  getBalanceForAddress = required;

  /**
   * This function will send the specified amount to the desired address.
   * @param {string} receiverAddress
   * @param {number} amount
   * @return {Promise} Will return a promise that resolves with a new created Transaction.
  */
  sendToAddress = required;
}

export { BlockchainManager };