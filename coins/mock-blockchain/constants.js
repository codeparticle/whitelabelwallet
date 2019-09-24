const KEY = 'mock';

const urls = {
  ADDRESS: '/address',
  ADDRESS_DETAILS: '/address?address=',
  BLOCKS: '/blocks',
  BLOCKS_DETAILS: '/blocks?hash=',
  LATEST_BLOCK: '/blocks?_sort=createdAt&_order=desc&_start=0&_end=1',
  LATEST_ADDRESS: '/address?_sort=createdAt&_order=desc&_start=0&_end=1',
  MINE_TRANSACTION: '/mineTransaction',
  SECRET_ITEMS: '/secretItems',
  TRANSACTIONS: '/tx',
  TRANSACTIONS_DETAILS: '/tx?txid=',
  UNSPENT_TX_OUTS: '/unspentTxOuts',
};

export {
  KEY,
  urls,
};

