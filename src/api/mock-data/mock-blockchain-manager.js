import { api } from 'rdx/api';
import { urls } from 'api/mock-data/constants.js';

const {
  TRANSACTIONS,
  TRANSACTIONS_DETAILS,
  ADDRESS,
  ADDRESS_DETAILS,
} = urls;

const charsetParams = {
  length: 35,
  charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

class mockBlockchainManager {
  /**
   * Mock get avalilable transaction history.
   * @return tx history
   */
  retrieveTransactionHistory() {
    api.request({
      url: TRANSACTIONS,
    }).then((response) => response.data
    ).catch((err) => err);
  }

  /**
   * Mock get transaction details for a single transaction.
   * @return single tx details
   */

  retrieveTransacationDetails(txid) {
    api.request({
      url: `${TRANSACTIONS_DETAILS}${txid}`,
    }).then((response) => response.data
    ).catch((err) => err);
  }

  /**
   * Mock get transaction details for a single address.
   * @return single address details
   */

  retrieveAddressDetails(address) {
    api.request({
      url: `${ADDRESS_DETAILS}${address}`,
    }).then((response) => response.data
    ).catch((err) => err);
  }

  /**
   * Retrieve balance of an address
   * @param {string} address
   * @return {promise} resolves to the balance data
   */
  retrieveAddressBalance(address) {
    api.request({
      url: `${ADDRESS_DETAILS}${address}`,
    }).then((response) => {
      const balanceData = {
        balance: response.data[0].balance,
        balanceSat: response.data[0].balanceSat,
      };

      return balanceData;
    }).catch((err) => err);
  }

  /**
   * Generate random string provided the length of the string
   * and the character sets to pick chars from
   * @param {int} length
   * @param {string} charsets
   */
  randomString(length = charsetParams.length, charsets = charsetParams.charset) {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += charsets[Math.round(Math.random() * (charsets.length - 1))];
    }
    return result;
  }

  /**
   * Generate an address to use in transactions
   * @param {description} address description
   * @param {label} address label
   */
  generateAddress(description = '', label = '') {
    const addressData = {
      address: this.randomString(),
      isMine: true,
      isWatchOnly: false,
      desc: description,
      isScript: false,
      isChange: false,
      isWitness: false,
      keys: {
        public: this.randomString(65),
        private: this.randomString(65),
      },
      label,
      solvable: true,
    };

    api.post(ADDRESS, addressData).then((response) => {
      console.log('address generated', response.data);
      return response.data;
    }).catch((err) => err);
  }
}

export { mockBlockchainManager };