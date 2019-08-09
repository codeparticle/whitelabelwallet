import * as CryptoJS from 'crypto-js';
import  _ from 'lodash';
import { api } from 'rdx/api';
import { urls } from 'api/mock-blockchain/constants';
import { TransactionManager } from 'api/mock-blockchain/transactions';
import { WalletManager } from 'api/mock-blockchain/wallet';
import { FormattedAddress } from 'api/mock-blockchain/models';

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

class BlockchainManager {

  static get instance() {
    if (!this._instance) {
      this._instance = new BlockchainManager();
    }
    return this._instance;
  }

  static resetInstance() {
    this._instance = null;
  }

  async apiGetItem(method, param = '') {
    let item;
    if (method.includes('?')) {
      item = (await api.get(`${method}${param}`)).data[0];
    } else {
      item = (await api.get(`${method}${param}`)).data;
    }
    return item;
  }

  async getAddressDetails(addressParam) {
    const blockchainAddress = await this.apiGetItem(ADDRESS_DETAILS, addressParam);
    const address = new FormattedAddress(blockchainAddress.id, blockchainAddress.label, blockchainAddress.address);
    return address;
  }

  async getLatestAddress() {
    const blockchainAddress = await this.apiGetItem(LATEST_ADDRESS);
    return blockchainAddress.address;
  }

  async getTransactions() {
    const transactionManager = TransactionManager.instance;
    const transactions = _.filter((await this.apiGetItem(BLOCKS))
      .map((blocks) => blocks.data)
      .flatten(), blockData => blockData.txid);
    const formattedTransactions = transactions.map(transactionManager.transactionFormatter);
    return formattedTransactions;
  }

  async getTransactionDetails(txid) {
    const transactionManager = TransactionManager.instance;
    const tx = _(await this.apiGetItem(BLOCKS))
      .map((blocks) => blocks.data)
      .flatten()
      .find({ 'txid':txid });
    return transactionManager.transactionFormatter(tx);
  }

  async getBalanceForAddress(address, unspentTxOuts) {
    const transactionManager = TransactionManager.instance;
    return await transactionManager.getBalance(address, unspentTxOuts);
  }

  transactionFormatter

  getRandomInt(max = 10) {
    return Math.floor(Math.random() * max) + 1;
  };

  getCurrentTimestamp () {
    return Math.round(new Date().getTime() / 1000);
  }

  /**
   * This can be used to add a block with any data to the blockchain.
   * @param {object} blockData
   */

  async generateRawNextBlock (blockData) {
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
   * This function can be used to generate coinbase Txs. The coinbase transaction contains only an output, but no inputs. This means that a coinbase transaction adds new coins to circulation.
   */

  async generateNextBlock () {
    const transactionManager = TransactionManager.instance;
    const walletManager = WalletManager.instance;
    const coinbaseTx = transactionManager.getCoinbaseTransaction(walletManager.getPublicFromWallet(), (await this.apiGetItem(LATEST_BLOCK)).index + 1);
    const blockData = [coinbaseTx];
    return await this.generateRawNextBlock(blockData);
  };

  /**
   * This function will add transactions blocks to the blockchain
   * @param {string} receiverAddress
   * @param {number} amount
   */

  async generateNextBlockWithTransaction (receiverAddress, amount) {
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
    const generatedTransaction = transactionManager.transactionFormatter(generatedBlock.data[0]);
    return generatedTransaction;
  };

  calculateHash (index, previousHash, timestamp, data, difficulty, nonce) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();
  }

  async addBlockToChain (newBlock) {
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

  isValidTimestamp (newBlock, previousBlock) {
    return (previousBlock.timestamp - 60 < newBlock.timestamp)
            && newBlock.timestamp - 60 < this.getCurrentTimestamp();
  };

  isValidNewBlock (newBlock, previousBlock) {
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


  isValidBlockStructure (block) {
    return typeof block.index === 'number'
          && typeof block.hash === 'string'
          && typeof block.previousHash === 'string'
          && typeof block.timestamp === 'number'
          && typeof block.data === 'object';
  };
}

export { Block, BlockchainManager };