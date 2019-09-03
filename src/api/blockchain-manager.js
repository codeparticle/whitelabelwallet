const required = () => {
  throw new Error('Implement Method')
  ;
};

class ApiBlockchainManager {
  // This class instance is always fetched using "ApiBlockchainManager.instance"
  static get instance() {
    if (!this._instance) {
      this._instance = new ApiBlockchainManager();
    }
    return this._instance;
  }

  // Used to reset a "ApiBlockchainManager.instance"
  static resetInstance() {
    this._instance = null;
  }

  /**
   * Returns a bip39 mnemonic phrase that will be used
   * when creating a new wallet.
   */
  static generateSecretPhrase = required;
  /**
   * Converts an array to a bip39 mnemonic phrase
   * @param {string} phrase
   */
  static arrayToPhrase = required;

  /**
   * Converts a bip39 mnemonic phrase to an array
   * @param {string} phrase
   */
  static phraseToArray = required;

  /**
   * Can be used to restore a wallet from a pass phrase
   * @param {string} phrase
   */
  static phraseAuthenticated = required;

  /**
   * This function is used to get the information about a particular Address.
   * @param {string} addressParam
   * @return {Promise} Will return a promise that resolves to an Address model containing
   * the address details. Address example below:
   * {
   *     id: id,
   *     name: name,
   *     address: address
   * }
  */
  getAddressDetails = required;

  /**
   * This function is used to get all the available transactions.
   * @return {Promise} Will return a promise that resolves with an Array of Transaction model objects
   * Example return:
   * [{
   *     id: id,
   *     amount: amount,
   *     description: description,
   *     rawData: rawData,
   *     fee: fee,
   *     senderAddress: senderAddress,
   *     recipientAddress: recipientAddress
   * }, ...]
  */
  getTransactions = required;

  /**
   * This function is used to get the information about a particular Transaction.
   * @param {string} txid
   * @return {Promise} Will return a promise that resolves to a Transaction model
   * containing the Transaction details. Transaction example below:
   * {
   *     id: id,
   *     amount: amount,
   *     description: description,
   *     rawData: rawData,
   *     fee: fee,
   *     senderAddress: senderAddress,
   *     recipientAddress: recipientAddress
   * }
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
   * @return {Promise} Will return a promise that resolves with a Transaction model containing
   * the newly created Transaction details.
   * Example return:
   * {
   *     id: id,
   *     amount: amount,
   *     description: description,
   *     rawData: rawData,
   *     fee: fee,
   *     senderAddress: senderAddress,
   *     recipientAddress: recipientAddress
   * }
  */
  sendToAddress = required;
}

export { ApiBlockchainManager };