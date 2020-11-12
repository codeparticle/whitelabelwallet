/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
import * as bip39 from 'bip39';
import { wordlists } from 'api/blockchain/utils';

const required = (methodName) => {
  throw new Error(`${methodName} undefined.`);
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
   * Creates a bip39 mnemonic phrase that will be used
   * when creating a new wallet.
   */
  generateSecretPhrase(localeCode = 'en') {
    // see valid-words-library for list of available languages
    let secretPhraseSet = new Set([]);
    let secretPhrase = '';

    while (secretPhraseSet.size !== 24) {
      secretPhrase = bip39.generateMnemonic(256, null, wordlists[localeCode]);
      secretPhraseSet = new Set(this.phraseToArray(secretPhrase));
    }

    return secretPhrase;
  }

  /**
   * Makes an api call to retrieve a given address's balance and transactions
   * Balance must be returned in Satoshi format.
   * Transactions must be an array of objects of the following format:
   * {
   *    amount,
   *    created_date,
   *    fee,
   *    receiver_address,
   *    sender_address,
   *    status,
   *    transaction_id,
   * }
   * Only used in polling service
   * @returns {Number} balance (in satoshis)
   * @param {String} address - public address string
   */
  fetchAddressDetails() {
    required('fetchAddressDetails');
  }

  /**
   * Base method that returns a single address from seed
   * @returns {Object} addressObject
   * @property {string} address
   * @property {string} privateKey
   * @param {string} mnemonicSeed - string seed from wallet
   */
  generateAddressFromSeed() {
    required('generateAddressFromSeed');
  }

  /**
   * This method creates a new address and transfers
   * The balance left from the old address to the new one.
   * @param {string} addressParam.
   * @return {obj} returns an Address.
   */
  refreshAddress() {
    required('refreshAddress');
  };

  /**
   * Converts an array to a bip39 mnemonic phrase
   * @param {string} phrase
   */
  arrayToPhrase(phrase) {
    return phrase.join(' ');
  }

  /**
   * Converts a bip39 mnemonic phrase to an array
   * @param {string} phrase
   */
  phraseToArray(phrase) {
    return phrase.trim().split(' ');
  }

  /**
   * Can be used to restore a wallet from a pass phrase
   * @param {string} phrase
   */
  phraseAuthenticated(phrase) {
    const phraseArray = this.phraseToArray(phrase);
    return phraseArray.length === 24;
  }

  getAddressBalance() {
    required('getAddressBalance');
  }

  createTransaction() {
    required('createTransaction');
  }

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
  getAddressDetails() {
    required('getAddressDetails');
  }

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
  getTransactions() {
    required('getTransactions');
  }

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
  getTransactionDetails() {
    required('getTransactionDetails');
  }

  /**
   * This get the balance of a particular address
   * @param {string} address
   * @param {array} Array of unspentTxOuts
   * @return {Promise} Will return a promise that resolves with the number balance associated to an address.
  */
  getBalanceForAddress() {
    required('getBalanceForAddress');
  }

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
  sendToAddress() {
    required('sendToAddress');
  }
}

export { ApiBlockchainManager };