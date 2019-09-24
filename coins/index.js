import { BitcoinBlockchainManager, KEY as BTC } from './bitcoin';
import { MockchainManager, KEY as MOCK } from './mock-blockchain';

export const blockchainManagers = {
  [BTC]: BitcoinBlockchainManager,
  [MOCK]: MockchainManager,
};
