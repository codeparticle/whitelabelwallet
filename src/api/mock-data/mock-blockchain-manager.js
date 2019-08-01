import { CryptoJS } from 'crypto-js';
import { api } from 'rdx/api';
import { urls } from 'api/mock-data/constants.js';
import { Block } from 'api/mock-data/block';

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
   * Generate hash of the data provided
   * @param {number}  index
   * @param {string}  previousHash
   * @param {number}  timestamp
   * @param {string}  data
   */
  calculateHash(index, previousHash, timestamp, data) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  }

  /** Determine if new block is valid */
  isValidNewBlock (newBlock, previousBlock) {
    if (previousBlock.index + 1 !== newBlock.index) {
      console.log('invalid index');
      return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
      console.log('invalid previoushash');
      return false;
    } else if (this.calculateHashForBlock(newBlock) !== newBlock.hash) {
      console.log(typeof (newBlock.hash) + ' ' + typeof this.calculateHashForBlock(newBlock));
      console.log('invalid hash: ' + this.calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
      return false;
    }
    return true;
  };

  /** Gernerate a new block */

  generateNextBlock (blockData) {
    const previousBlock = this.getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    const newBlock = new Block(nextIndex, nextHash, previousBlock.hash, nextTimestamp, blockData);
    return newBlock;
  };


  /**
   * Mock get avalilable transaction history.
   * @return tx history
   */
  retrieveTransactionHistory() {
    api.get(TRANSACTIONS).then((response) => response.data
    ).catch((err) => err);
  }

  /**
   * Mock get transaction details for a single transaction.
   * @return single tx details
   */

  retrieveTransacationDetails(txid) {
    api.get(`${TRANSACTIONS_DETAILS}${txid}`).then((response) => {
      return response.data;
    }
    ).catch((err) => err);
  }

  /**
   * Mock get transaction details for a single address.
   * @return single address details
   */

  retrieveAddressDetails(address) {
    api.get(`${ADDRESS_DETAILS}${address}`).then((response) => response.data
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

    // get most recent transaction/s using from address that totals amount param and creat vin, spcript sig is public key

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