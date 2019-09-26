import { environment } from 'lib/utils';
const { isDev } = environment;

const NETWORK = isDev()
  ? 'testnet'
  : 'bitcoin';

const urls = {
  ADDRESS: 'https://api.blockcypher.com/v1/btc/test3/addrs',
  TRANSACTIONS: 'https://api.blockcypher.com/v1/btc/test3/txs',
  BROADCAST_TRANSACTION: 'https://api.blockcypher.com/v1/btc/test3/txs/push',
};

const BIP32 = {
  DERIVATION_PATH_BASE: "m/0'",
  CHANGE_CHAIN: {
    EXTERNAL: 0,
    INTERNAL: 1,
  },
};

export {
  BIP32,
  NETWORK,
  urls,
};