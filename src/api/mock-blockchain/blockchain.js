import * as CryptoJS from 'crypto-js';
import  _ from 'lodash';

import { api } from 'rdx/api';
import { urls, blockchain } from 'api/mock-blockchain/constants';
import { hexToBinary } from 'api/mock-blockchain/utils/hex-to-binary';
import { TransactionService } from 'api/mock-blockchain/transactions';
import { WalletService } from 'api/mock-blockchain/wallet';

const {
  BLOCKS,
  BLOCKS_DETAILS,
  LATEST_BLOCK,
  UNSPENT_TX_OUTS,
  LATEST_ADDRESS,
  ADDRESS_DETAILS,
} = urls;

const {
  BLOCK_GENERATION_INTERVAL,
  DIFFICULTY_ADJUSTMENT_INTERVAL,
} = blockchain;

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

const genesisBlock = new Block(
  0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', '', 1465154705, 'my genesis block!!', 0, 0
);

class BlockchainManager {

  async createGenesisBLock() {
    const genisisBlock = await api.post(BLOCKS, genesisBlock);
    return genisisBlock;
  }

  async getBlockchain() {
    const blockchainData = (await api.get(BLOCKS)).data;
    return new Promise(resolve => resolve(blockchainData));
  }

  async getLatestBlock() {
    const latestBLock = (await api.get(LATEST_BLOCK)).data[0];
    return new Promise(resolve => resolve(latestBLock));
  }

  async getUnspentTxOs() {
    const transactionServiceInst = new TransactionService();
    const uTxOs = await transactionServiceInst.getUnspentTxOuts();
    return new Promise(resolve => resolve(uTxOs));
  }

  async getAddress(address) {
    const addressDetails = ((await api.get(`${ADDRESS_DETAILS}${address}`)).data[0]);
    return new Promise(resolve => resolve(addressDetails));
  }

  async getLatestAddress() {
    const latestAddress = (await api.get(LATEST_ADDRESS)).data[0];
    return new Promise(resolve => resolve(latestAddress));
  }

  async getBlockDetails(hash) {
    const block = (await api.get(`${BLOCKS_DETAILS}${hash}`)).data[0];
    return new Promise(resolve => resolve(block));
  }

  async getTransactions() {
    const transactions = _.filter((await this.getBlockchain())
      .map((blocks) => blocks.data)
      .flatten(), blockData => blockData.txid);
    return new Promise(resolve => resolve(transactions));
  }

  async getTransactionDetial(txid) {
    const tx = _(await this.getBlockchain())
      .map((blocks) => blocks.data)
      .flatten()
      .find({ 'txid':txid });
    return new Promise(resolve => resolve(tx));
  }

  async getBalanceForAddress(address, unspentTxOuts) {
    const walletServiceInst = new WalletService();
    const balance = walletServiceInst.getBalance(address, unspentTxOuts);
    return new Promise(resolve => resolve(balance));
  }

  /**
   * For every 10 blocks that is generated, we check if the time that took to generate those blocks are larger or smaller than the expected time. The expected time is calculated like this: BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL. The expected time represents the case where the hashrate matches exactly the current difficulty.
   * @param {array} blockchain
   */

  getDifficulty(blockchain) {
    const latestBlock = blockchain[blockchain.length - 1];
    if (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
      return this.getAdjustedDifficulty(latestBlock, blockchain);
    } else {
      return latestBlock.difficulty;
    }
  };

  /**
   * We either increase or decrease the difficulty by one if the time taken is at least two    times greater or smaller than the expected difficulty.
   * @param {obj} latestBlock
   * @param {array} blockchain
   */

  getAdjustedDifficulty (latestBlock, blockchain) {
    const prevAdjustmentBlock = blockchain[blockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
    const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
    const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
    if (timeTaken < timeExpected / 2) {
      return prevAdjustmentBlock.difficulty + 1;
    } else if (timeTaken > timeExpected * 2 && prevAdjustmentBlock.difficulty > 0) {
      return prevAdjustmentBlock.difficulty - 1;
    } else {
      return prevAdjustmentBlock.difficulty;
    }
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
    const difficulty = this.getDifficulty(await this.getBlockchain());
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = this.getCurrentTimestamp();
    const newBlock = this.findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
    if (await this.addBlockToChain(newBlock)) {
      // broadcastLatest(); TODO: mock broadcasting to p2p server maybe?
      return newBlock;
    } else {
      return null;
    }
  };

  /**
   * This funciton can be used to generatae coinbase Txs. The coinbase transaction contains only an output, but no inputs. This means that a coinbase transaction adds new coins to circulation.
   */

  async generateNextBlock () {
    const transactionServiceInst = new TransactionService();
    const walletServiceInst = new WalletService();
    const coinbaseTx = transactionServiceInst.getCoinbaseTransaction(walletServiceInst.getPublicFromWallet(), (await this.getLatestBlock()).index + 1);
    const blockData = [coinbaseTx];
    return await this.generateRawNextBlock(blockData);
  };

  /**
   * This funciton will add transcations blocks to the blockhain and also generates a coin to the caller, in this case our wallet, that executes the function(a reward for minining the block);
   * @param {string} receiverAddress
   * @param {number} amount
   */

  async generatenextBlockWithTransaction (receiverAddress, amount) {
    const transactionServiceInst = new TransactionService();
    const walletServiceInst = new WalletService();
    if (!transactionServiceInst.isValidAddress(receiverAddress)) {
      throw Error('invalid address');
    }
    if (typeof amount !== 'number') {
      throw Error('invalid amount');
    }
    const coinbaseTx = transactionServiceInst.getCoinbaseTransaction(walletServiceInst.getPublicFromWallet(), (await this.getLatestBlock()).index + 1);
    const tx = walletServiceInst.createTransaction(receiverAddress, amount, walletServiceInst.getPrivateFromWallet(), await transactionServiceInst.getUnspentTxOuts());
    const blockData = [coinbaseTx, tx];
    return await this.generateRawNextBlock(blockData);
  };

  /**
   * To find a hash that satisfies the difficulty, we must be able to calculate different hashes for the same content of the block. This is done by modifying the nonce parameter. Because SHA256 is a hash function, each time anything in the block changes, the hash will be completely different. “Mining” is basically just trying a different nonce until the block hash matches the difficulty.
   *
   * To find a valid block hash we must increase the nonce until we get a valid hash. To find a satisfying hash is completely a random process. We must just loop through enough nonces until we find a satisfying hash:
   * @param {number} index
   * @param {string} previousHash
   * @param {number} timestamp
   * @param {string} data
   * @param {number} difficulty
   */

  findBlock (index, previousHash, timestamp, data, difficulty) {
    let nonce = 0;
    while (true) {
      const hash = this.calculateHash(index, previousHash, timestamp, data, difficulty, nonce);
      if (this.hashMatchesDifficulty(hash, difficulty)) {
        return new Block(index, hash, previousHash, timestamp, data, difficulty, nonce);
      }
      nonce++;
    }
  };

  calculateHashForBlock (block) {
    return this.calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.difficulty, block.nonce);
  }


  calculateHash (index, previousHash, timestamp, data, difficulty, nonce) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();
  }

  async addBlockToChain (newBlock) {
    if (this.isValidNewBlock(newBlock, await this.getLatestBlock())) {
      const transactionServiceInst = new TransactionService();
      const processedData = transactionServiceInst.processTransactions(newBlock.data, await this.getUnspentTxOs(), newBlock.index);
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
   * Caluclates the accumlated difficulty of block cahin returns a diffucalty score.
   * To get the cumulative difficulty of a chain we calculate 2^difficulty for each block and take a sum of all those numbers. We have to use the 2^difficulty as we chose the difficulty to represent the number of zeros that must prefix the hash in binary format.
   * @param {array} blockchain
   */
  getAccumulatedDifficulty (blockchain) {
    return blockchain
      .map((block) => block.difficulty)
      .map((difficulty) => Math.pow(2, difficulty))
      .reduce((total, currentDifficulty) => total + currentDifficulty);
  };

  /**
     * This was implemented to mimic some security messures most blockchains adhere to in odrder to prevent false timestamps in an effort to manipulate the difficulty.
     * A block is valid, if the timestamp is at most 1 min in the future from the time we perceive.
    * A block in the chain is valid, if the timestamp is at most 1 min in the past of the previous block.
     * @param {obj} newBlock
     * @param {obj} previousBlockk
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
    } else if (!this.hasValidHash(newBlock)) {
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

  hasValidHash (block) {
    if (!this.hashMatchesBlockContent(block)) {
      console.log('invalid hash, got:' + block.hash);
      return false;
    }
    if (!this.hashMatchesDifficulty(block.hash, block.difficulty)) {
      console.log('block difficulty not satisfied. Expected: ' + block.difficulty + 'got: ' + block.hash);
    }
    return true;
  };

  hashMatchesBlockContent (block) {
    const blockHash = this.calculateHashForBlock(block);
    return blockHash === block.hash;
  };

  hashMatchesDifficulty (hash, difficulty) {
    const hashInBinary = hexToBinary(hash);
    const requiredPrefix = '0'.repeat(difficulty);
    return hashInBinary.startsWith(requiredPrefix);
  };

  isValidChain (blockchainToValidate) {
    const isValidGenesis = (block) => {
      return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };

    if (!isValidGenesis(blockchainToValidate[0])) {
      return false;
    }

    for (let i = 1; i < blockchainToValidate.length; i++) {
      if (!this.isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
        return false;
      }
    }
    return true;
  };

  /**
 * The correct chain has the most cummalitive difficulty.
 * @param {array} newBlocks
 */

  async replaceChain (newBlocks) {
    if (this.isValidChain(newBlocks) &&
    this.getAccumulatedDifficulty(newBlocks) > this.getAccumulatedDifficulty(await this.getBlockchain())) {
      console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
      // TODO: reset block chain with new blocks. Example: blockchain = newBlocks;
      // TODO: brocacast to peers. Example: broadcastLatest();
    } else {
      console.log('Received blockchain invalid');
    }
  };
}

export { Block, BlockchainManager };