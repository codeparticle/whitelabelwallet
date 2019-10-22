import { get } from 'lodash';

const getAddresses = state => get(state, 'transactionsData.addresses', []);
const getTransactions = state => get(state, 'transactionsData.transactions', []);

export {
  getAddresses,
  getTransactions,
};