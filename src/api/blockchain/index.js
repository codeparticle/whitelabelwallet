import * as constants from './constants';
import { BlockchainManager as MockchainManager } from './mock-blockchain/blockchain';
import { BitcoinBlockchainManager } from './bitcoin/blockchain';

const { COIN_KEYS } = constants;
const { BTC, MOCK } = COIN_KEYS;

const BLOCKCHAIN_MANAGERS = {
  [BTC]: BitcoinBlockchainManager,
  [MOCK]: MockchainManager,
};

export {
  BLOCKCHAIN_MANAGERS,
  constants,
};
