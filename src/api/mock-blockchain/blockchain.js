import * as CryptoJS from 'crypto-js';
import  _ from 'lodash';
import { api } from 'rdx/api';
import { urls } from 'api/mock-blockchain/constants';
import { TransactionManager } from 'api/mock-blockchain/transactions';
import { WalletManager } from 'api/mock-blockchain/wallet';

const {
  BLOCKS,
  BLOCKS_DETAILS,
  LATEST_BLOCK,
  UNSPENT_TX_OUTS,
  LATEST_ADDRESS,
  ADDRESS_DETAILS,
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
      // this._instance = BlockchainManager.instance;
      this._instance = new BlockchainManager();
    }
    return this._instance;
  }

  static resetInstance() {
    this._instance = null;
  }

  async getBlockchain() {
    return (await api.get(BLOCKS)).data;
  }

  async getLatestBlock() {
    return (await api.get(LATEST_BLOCK)).data[0];
  }

  async getUnspentTxOs() {
    const transactionManagerInst = TransactionManager.instance;
    return await transactionManagerInst.getUnspentTxOuts();
  }

  async getAddressDetails(address) {
    return ((await api.get(`${ADDRESS_DETAILS}${address}`)).data[0]);
  }

  async getLatestAddress() {
    return (await api.get(LATEST_ADDRESS)).data[0];
  }

  async getBlockDetails(hash) {
    return (await api.get(`${BLOCKS_DETAILS}${hash}`)).data[0];
  }

  async getTransactions() {
    const transactions = _.filter((await this.getBlockchain())
      .map((blocks) => blocks.data)
      .flatten(), blockData => blockData.txid);
    return transactions;
  }

  async getTransactionDetails(txid) {
    const tx = _(await this.getBlockchain())
      .map((blocks) => blocks.data)
      .flatten()
      .find({ 'txid':txid });
    return tx;
  }

  async getBalanceForAddress(address, unspentTxOuts) {
    const transactionManagerInst = TransactionManager.instance;
    return await transactionManagerInst.getBalance(address, unspentTxOuts);
  }

  /**
   * Generate random mock difficulty value
   */

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
    const previousBlock = await this.getLatestBlock();
    const difficulty = this.getRandomInt();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = this.getCurrentTimestamp();
    const nonce = this.getRandomInt();
    const hash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty, nonce);
    const newBlock = new Block(nextIndex, hash, previousBlock.hash, nextTimestamp, blockData, difficulty, nonce);
    if (await this.addBlockToChain(newBlock)) {
      // broadcastLatest(); TODO: mock broadcasting to p2p server maybe?
      return newBlock;
    }

    return null;
  };

  /**
   * This function can be used to generate coinbase Txs. The coinbase transaction contains only an output, but no inputs. This means that a coinbase transaction adds new coins to circulation.
   */

  async generateNextBlock () {
    const transactionManagerInst = TransactionManager.instance;
    const walletManagerInst = WalletManager.instance;
    const coinbaseTx = transactionManagerInst.getCoinbaseTransaction(walletManagerInst.getPublicFromWallet(), (await this.getLatestBlock()).index + 1);
    const blockData = [coinbaseTx];
    return await this.generateRawNextBlock(blockData);
  };

  /**
   * This function will add transactions blocks to the blockchain and also generates a coin to the caller, in this case our wallet, that executes the function(a reward for mining the block);
   * @param {string} receiverAddress
   * @param {number} amount
   */

  async generateNextBlockWithTransaction (receiverAddress, amount) {
    const transactionManagerInst = TransactionManager.instance;
    const walletManagerInst = WalletManager.instance;
    if (!transactionManagerInst.isValidAddress(receiverAddress)) {
      throw Error('invalid address');
    }
    if (typeof amount !== 'number') {
      throw Error('invalid amount');
    }
    const coinbaseTx = transactionManagerInst.getCoinbaseTransaction(walletManagerInst.getPublicFromWallet(), (await this.getLatestBlock()).index + 1);
    const tx = transactionManagerInst.createTransaction(receiverAddress, amount, walletManagerInst.getPrivateFromWallet(), await transactionManagerInst.getUnspentTxOuts());
    const blockData = [coinbaseTx, tx];
    const generatedBlock =  await this.generateRawNextBlock(blockData);
    console.log('========\n', 'generatedBlock', generatedBlock, '\n========');
    return generatedBlock;
  };

  calculateHash (index, previousHash, timestamp, data, difficulty, nonce) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();
  }

  async addBlockToChain (newBlock) {
    if (this.isValidNewBlock(newBlock, await this.getLatestBlock())) {
      const transactionManagerInst = TransactionManager.instance;
      const processedData = transactionManagerInst.processTransactions(newBlock.data, await this.getUnspentTxOs(), newBlock.index);
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