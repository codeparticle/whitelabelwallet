import { api } from 'rdx/api';
import { urls } from 'api/mock-data/constants.js';

const {
  TRANSACTIONS,
  TRANSACTIONS_DETAILS,
  ADDRESS_DETAILS,
} = urls;

class mockBlockchainManager {
  /**
   * Mock get avalilable transaction history.
   * @return tx history
   */
  retrieveTransactionHistory() {
    api.request({
      url: TRANSACTIONS,
    }).then((response) => response.data)
      .catch((err) => err);
  }

  /**
   * Mock get transaction details for a single transaction.
   * @return single tx details
   */

  retrieveTransacationDetails(txid) {
    console.log(`${TRANSACTIONS_DETAILS}${txid}`);
    api.request({
      url: `${TRANSACTIONS_DETAILS}${txid}`,
    }).then((response) => {
      console.log(response.data);
    })
      .catch((err) => err);
  }

  /**
   * Mock get transaction details for a single address.
   * @return single address details
   */

  retrieveAddressDetails(address) {
    api.request({
      url: `${ADDRESS_DETAILS}=${address}`,
    }).then((response) => response.data)
      .catch((err) => err);
  }

  /**
   * Retrieve balance of an address
   * @param {string} address
   * @return {promise} resolves to the balance
   */
  retrieveAddressBalance(address) {
    api.request({
      url: `${ADDRESS_DETAILS}=${address}`,
    }).then((response) => {
      const balanceData = {
        balannce: response.balance,
        balanceSat: response.balanceSat,
      };

      console.log('========\n', 'response', response, '\n========');

      console.log('========\n', 'balanceData', balanceData, '\n========');

      return balanceData;
    })
      .catch((err) => err);
  }
}

export { mockBlockchainManager };