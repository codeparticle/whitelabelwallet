import { environment } from 'lib/utils';
const { isDev } = environment;

const KEY = 'btc';
const TESTNET = 'testnet';
const BITCOIN = 'bitcoin';

const NETWORK = isDev()
  ? TESTNET
  : BITCOIN;

const NET = NETWORK === TESTNET
  ? 'test3'
  : 'main';

const BLOCK_CYPHER = `https://api.blockcypher.com/v1/btc/${NET}`;

const urls = {
  ADDRESS: `${BLOCK_CYPHER}/addrs`,
  BALANCE: (addr) => `${urls.ADDRESS}/${addr}/balance`,
  TRANSACTIONS: `${BLOCK_CYPHER}/txs`,
  BROADCAST_TRANSACTION: `${BLOCK_CYPHER}/txs/push`,
};

const BIP32 = {
  DERIVATION_PATH_BASE: "m/0'",
  CHANGE_CHAIN: {
    EXTERNAL: 0,
    INTERNAL: 1,
  },
  ACCOUNT_BASE: 0,
};

export {
  BIP32,
  KEY,
  NETWORK,
  urls,
};