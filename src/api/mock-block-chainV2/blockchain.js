import * as CryptoJS from 'crypto-js';
// import { broadcastLatest } from './p2p';

import { api } from 'rdx/api';
import { urls, blockchain } from 'api/mock-data/constants.js';
import { hexToBinary } from 'api/mock-block-chainV2/utils/hex-to-binary.js';

const {
  BLOCKS,
  LATESTBLOCK,
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

  createGenesisBLock() {
    api.post(BLOCKS, genesisBlock).then((response) => {
      return response.data;
    });
  }

  async getBlockchain() {
    const blockchainData = (await api.get(BLOCKS)).data;
    console.log('========\n', 'getBlockchainData', blockchainData, '\n========');
    return blockchainData;
  }

  async getLatestBlock() {
    const latestBLock = (await api.get(LATESTBLOCK)).data[0];
    return latestBLock;
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
    } else if (timeTaken > timeExpected * 2) {
      return prevAdjustmentBlock.difficulty - 1;
    } else {
      return prevAdjustmentBlock.difficulty;
    }
  };

  getCurrentTimestamp () {
    return Math.round(new Date().getTime() / 1000);
  }

  async generateNextBlock (blockData) {
    const previousBlock = await this.getLatestBlock();
    const difficulty = this.getDifficulty(await this.getBlockchain());
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = this.getCurrentTimestamp();
    const newBlock = this.findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
    await this.addBlock(newBlock);
    // broadcastLatest(); mock broadcasting p2p
    return newBlock;
  };

  /**
   * To find a hash that satisfies the difficulty, we must be able to calculate different hashes for the same content of the block. This is done by modifying the nonce parameter. Because SHA256 is a hash function, each time anything in the block changes, the hash will be completely different. “Mining” is basically just trying a different nonce until the block hash matches the difficulty.
   *
   * To find a valid block hash we must increase the nonce as until we get a valid hash. To find a satisfying hash is completely a random process. We must just loop through enough nonces until we find a satisfying hash:
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

  async addBlock (newBlock) {
    if (this.isValidNewBlock(newBlock, await this.getLatestBlock())) {
    // block valid now post new block
      const block = (await api.post(BLOCKS, newBlock)).data;
      return block;

    }
  };

  isValidBlockStructure (block) {
    return typeof block.index === 'number'
          && typeof block.hash === 'string'
          && typeof block.previousHash === 'string'
          && typeof block.timestamp === 'number'
          && typeof block.data === 'string';
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

  /**
   * caluclates the accumlated difficulty of block cahin returns a diffucalty score
   * @param {array} blockchain
   */
  getAccumulatedDifficulty (blockchain) {
    return blockchain
      .map((block) => block.difficulty)
      .map((difficulty) => Math.pow(2, difficulty))
      .reduce((a, b) => a + b);
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