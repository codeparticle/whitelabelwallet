import { environment } from 'lib/utils';
import { BitcoinBlockchainManager, KEY as BTC } from './bitcoin';
import { MockchainManager, KEY as MOCK } from './mock-blockchain';

const { coin } = environment;

export const blockchainManagers = {
  [BTC]: BitcoinBlockchainManager,
  [MOCK]: MockchainManager,
};

let BlockchainManager = blockchainManagers[coin];

if (typeof BlockchainManager === 'undefined')  {
  BlockchainManager = blockchainManagers.btc;
}

BlockchainManager = BlockchainManager.instance;

export { BlockchainManager };
