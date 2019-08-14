import * as CryptoJS from 'crypto-js';
import  _ from 'lodash';
import { api } from 'rdx/api';
import { urls } from 'api/mock-blockchain/constants';
import { ApiBlockchainManager } from 'api/blockchain-manager';
import { TransactionManager } from 'api/mock-blockchain/transactions';
import { WalletManager } from 'api/mock-blockchain/wallet';
import { Address } from 'models';

const {
  ADDRESS_DETAILS,
  BLOCKS,
  LATEST_ADDRESS,
  LATEST_BLOCK,
  UNSPENT_TX_OUTS,
} = urls;

class Block {
  constructor(index, hash, previousHash, timestamp, data, difficulty, nonce) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}

class BlockchainManager extends ApiBlockchainManager {
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
   * Generic helper method to perform get calls to the api
   * @param {string} method
   * @param {string} queryParam
   * @return {*} This will return the api response
   */
  apiGetItem = async (method, param = '') => {
    let item;
    if (method.includes('?')) {
      item = (await api.get(`${method}${param}`)).data[0];
    } else {
      item = (await api.get(`${method}${param}`)).data;
    }
    return item;
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
  getAddressDetails = async (addressParam) => {
    const blockchainAddress = await this.apiGetItem(ADDRESS_DETAILS, addressParam);
    const address = new Address(blockchainAddress.id, blockchainAddress.label, blockchainAddress.address);
    return address;
  }

  // gets the latest created toAddress and returns as a string
  getLatestAddress =  async () => {
    const blockchainAddress = await this.apiGetItem(LATEST_ADDRESS);
    return blockchainAddress.address;
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
  getTransactions = async() => {
    const transactionManager = TransactionManager.instance;
    const rawTransactions = _.filter((await this.apiGetItem(BLOCKS))
      .map((blocks) => blocks.data)
      .flatten(), blockData => blockData.txid);
    const transactions = rawTransactions.map(transactionManager.transactionFormatter);
    return transactions;
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
  getTransactionDetails = async(txid) => {
    const transactionManager = TransactionManager.instance;
    const tx = _(await this.apiGetItem(BLOCKS))
      .map((blocks) => blocks.data)
      .flatten()
      .find({ 'txid':txid });
    return transactionManager.transactionFormatter(tx);
  }

  /**
   * This get the balance of a particular address
   * @param {string} address
   * @param {array} Array of unspentTxOuts
   * @return {Promise} Will return a promise that resolves with the number balance associated to an address.
  */
  getBalanceForAddress = async (address, unspentTxOuts) => {
    const transactionManager = TransactionManager.instance;
    return await transactionManager.getBalance(address, unspentTxOuts);
  }

  /**
   * Used to mock certain values
   * @returns an integer between 1 - 10
   */
  getRandomInt = (max = 10) => {
    return Math.floor(Math.random() * max) + 1;
  };

  /**
   * Gets the current time(in seconds),
   * which is consistent with bitcoin timestamps
   * @returns current time in seconds.
   */
  getCurrentTimestamp = () => {
    return Math.round(new Date().getTime() / 1000);
  }

  /**
   * This can be used to add a block with any data to the blockchain.
   * @param {object} blockData
   */

  generateRawNextBlock = async (blockData) => {
    const previousBlock = await this.apiGetItem(LATEST_BLOCK);
    const difficulty = this.getRandomInt();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = this.getCurrentTimestamp();
    const nonce = this.getRandomInt();
    const hash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty, nonce);
    const newBlock = new Block(nextIndex, hash, previousBlock.hash, nextTimestamp, blockData, difficulty, nonce);
    if (await this.addBlockToChain(newBlock)) {
      return newBlock;
    }
    return null;
  };

  /**
   * This function can be used to generate coinbase Txs.
   * The coinbase transaction contains only an output, but no inputs.
   * This means that a coinbase transaction adds new coins to circulation.
   */

  generateNextBlock = async () => {
    const transactionManager = TransactionManager.instance;
    const walletManager = WalletManager.instance;
    const coinbaseTx = transactionManager.getCoinbaseTransaction(walletManager.getPublicFromWallet(), (await this.apiGetItem(LATEST_BLOCK)).index + 1);
    const blockData = [coinbaseTx];
    return await this.generateRawNextBlock(blockData);
  };

  /**
   * This function will send the specified amount to the desired address.
   * Also will add the transaction block to the blockchain.
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

   sendToAddress =  async (receiverAddress, amount) => {
     const transactionManager = TransactionManager.instance;
     const walletManager = WalletManager.instance;
     if (!transactionManager.isValidAddress(receiverAddress)) {
       throw Error('invalid address');
     }
     if (typeof amount !== 'number') {
       throw Error('invalid amount');
     }
     const tx = transactionManager.createTransaction(receiverAddress, amount, walletManager.getPrivateFromWallet(), await this.apiGetItem(UNSPENT_TX_OUTS));
     const blockData = [tx];
     const generatedBlock =  await this.generateRawNextBlock(blockData);
     const transaction = transactionManager.transactionFormatter(generatedBlock.data[0]);
     return transaction;
   };

   /**
    * Calculates a SHA256 hash of the passed in data
    * @param {number} index
    * @param {string} previousHash
    * @param {number} timestamp
    * @param {obj} data
    * @param {number} difficulty
    * @param {number} nonce
    * @return {string} returns a newly created hash.
    */
   calculateHash = (index, previousHash, timestamp, data, difficulty, nonce) => {
     return CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();
   }

   /**
    * This function makes the api request to add the new block to 'blockchain' in
    * our case the block index within the db.json. It also needs to update the
    * unspentTxOuts which are updated each time a new block is added to the chain.
    * @param {obj} newBlock
    * @return {boo} returns true if the new block was successfully added to the blockchain.
    */
   addBlockToChain = async (newBlock) => {
     if (this.isValidNewBlock(newBlock, await this.apiGetItem(LATEST_BLOCK))) {
       const transactionManager = TransactionManager.instance;
       const processedData = transactionManager.processTransactions(newBlock.data, await this.apiGetItem(UNSPENT_TX_OUTS), newBlock.index);
       if (processedData === null) {
         return false;
       } else {
         await api.post(BLOCKS, newBlock);
         await api.post(UNSPENT_TX_OUTS, processedData);

         return true;
       }
     }
     return false;
   };

   /**
     * This was implemented to mimic some security measures most blockchains adhere to in order to prevent false timestamps in an effort to manipulate the difficulty.
     * A block is valid, if the timestamp is at most 1 min in the future from the time we perceive.
     * A block in the chain is valid, if the timestamp is at most 1 min in the past of the previous block.
     * @param {obj} newBlock
     * @param {obj} previousBlock
     * @return {bool} if timestamp is valid or not
     */

   isValidTimestamp = (newBlock, previousBlock) => {
     return (previousBlock.timestamp - 60 < newBlock.timestamp)
            && newBlock.timestamp - 60 < this.getCurrentTimestamp();
   };

   /**
    * Runs a series of checks to determine if a specific block
    * @param {obj} newBlock
    * @param {obj} previousBlock
    */
   isValidNewBlock = (newBlock, previousBlock) => {
     if (!this.isValidBlockStructure(newBlock)) {
       console.log('invalid structure');
       return false;
     }
     if (previousBlock.index + 1 !== newBlock.index) {
       console.log('invalid index');
       return false;
     } else if (previousBlock.hash !== newBlock.previousHash) {
       console.log('invalid previoushash');
       return false;
     } else if (!this.isValidTimestamp(newBlock, previousBlock)) {
       console.log('invalid timestamp');
       return false;
     }
     return true;
   };

   /**
    * Checks if the properties of a block are the right type
    * @param {obj} block
    */
   isValidBlockStructure = (block) => {
     return typeof block.index === 'number'
          && typeof block.hash === 'string'
          && typeof block.previousHash === 'string'
          && typeof block.timestamp === 'number'
          && typeof block.data === 'object';
   };
}

export { Block, BlockchainManager };