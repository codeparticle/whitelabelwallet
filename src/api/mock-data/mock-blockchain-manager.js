import { api } from 'rdx/api';
import { urls } from 'api/mock-data/constants.js';

const {
  TRANSACTIONS,
  TRANSACTIONS_DETAILS,
  ADDRESS,
  ADDRESS_BALANCE,
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
    api.get({
      url: TRANSACTIONS,
    }).then((response) => response.data
    ).catch((err) => err);
  }

  /**
   * Mock get transaction details for a single transaction.
   * @return single tx details
   */

  retrieveTransacationDetails(txid) {
    console.log('========\n', '`${TRANSACTIONS_DETAILS}${txid}`', `${TRANSACTIONS_DETAILS}${txid}`, '\n========');
    api.get(`${TRANSACTIONS_DETAILS}${txid}`).then((response) => {
      console.log('========\n', 'response.data', response.data, '\n========');
      return response.data;
    }
    ).catch((err) => err);
  }

  /**
   * Mock get transaction details for a single address.
   * @return single address details
   */

  retrieveAddressDetails(address) {
    api.get({
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
    api.get(`${ADDRESS_BALANCE}${address}`).then((response) => {
      const balanceData = response.data.data;
      const balanceReducer = (total, currentObj) => total + currentObj.value;
      let incomingBalance = 0;
      let outgoingBalance = 0;

      balanceData.incomingTxs.forEach((tx) => {
        incomingBalance += tx.vout.reduce(balanceReducer, 0);
      });

      balanceData.outgoingTxs.forEach((tx) => {
        outgoingBalance += tx.vin.reduce(balanceReducer, 0);
      });

      return incomingBalance - outgoingBalance;
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
      return response.data;
    }).catch((err) => err);
  }

  sendToAddress(fromAddress, receivingAdress, amount, pubKey) {

    // get most recent transaction using from address that totals amount param and creat vin, spcript sig is public key

    // create v out using reveiving address and publickey key param

    // mine block and add to block chain
    const transactionData = {
      txid: this.randomString(65),
      version: 1,
      locktime: 0,
    };
  }
}

export { mockBlockchainManager };