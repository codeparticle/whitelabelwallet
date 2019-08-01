import * as CryptoJS from 'crypto-js';
// import { broadcastLatest } from './p2p';

import { api } from 'rdx/api';
import { urls } from 'api/mock-data/constants.js';

const {
  BLOCKS,
  LATESTBLOCK,
} = urls;

class Block {
  constructor(index, hash, previousHash, timestamp, data) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
  }
}

const genesisBlock = new Block(
  0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', '', 1465154705, 'my genesis block!!'
);

class BlockchainManager {

  createGenesisBLock() {
    api.post(BLOCKS, genesisBlock).then((response) => {
      return response.data;
    });
  }

  getBlockChain() {
    api.get(BLOCKS).then((response)=>{
      console.log(response.data);
      return response.data;
    });
  }

  async getLatestBlock() {
    const latestBLock = (await api.get(LATESTBLOCK)).data[0];
    return latestBLock;
  }

  async generateNextBlock (blockData) {
    const previousBlock = await this.getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    const newBlock = new Block(nextIndex, nextHash, previousBlock.hash, nextTimestamp, blockData);
    await this.addBlock(newBlock);
    // broadcastLatest(); mock broadcasting p2p
    return newBlock;
  };

  calculateHashForBlock (block) {
    return this.calculateHash(block.index, block.previousHash, block.timestamp, block.data);
  }


  calculateHash (index, previousHash, timestamp, data) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
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
    } else if (this.calculateHashForBlock(newBlock) !== newBlock.hash) {
      console.log(typeof (newBlock.hash) + ' ' + typeof this.calculateHashForBlock(newBlock));
      console.log('invalid hash: ' + this.calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
      return false;
    }
    return true;
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

  replaceChain (newBlocks) {
    if (this.isValidChain(newBlocks) && newBlocks.length > this.getBlockchain().length) {
      console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
    // blockchain = newBlocks;
    // TODO: replace your blocks with new valid blocks(not sure if it works with db.son implementation);
    // TODO: broadcastLatest();
    } else {
      console.log('Received blockchain invalid');
    }
  };
}

export { Block, BlockchainManager };