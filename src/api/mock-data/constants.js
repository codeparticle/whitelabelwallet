const urls = {
  ADDRESS: '/address',
  ADDRESS_BALANCE: '/tx?address=',
  ADDRESS_DETAILS: '/address?address=',
  BLOCKS: '/blocks',
  LATESTBLOCK: '/blocks?_sort=createdAt&_order=desc&_start=0&_end=1',
  SECRET_ITEMS: '/secretItems',
  TRANSACTIONS: '/tx',
  TRANSACTIONS_DETAILS: '/tx?txid=',
  UNSPENT_TX_OUTS: '/unspentTxOuts',
};

const blockchain = {
  // in seconds
  BLOCK_GENERATION_INTERVAL: 10,
  // in blocks
  DIFFICULTY_ADJUSTMENT_INTERVAL: 10,
};

export {
  blockchain,
  urls,
};

