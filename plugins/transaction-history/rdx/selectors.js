import { get } from 'lodash';

const getAddresses = state => get(state, 'transactionsData.addresses', []);
const getFiat = state => get(state, 'settings.fiat');
const getTransactions = state => get(state, 'transactionsData.transactions', []);

export {
  getAddresses,
  getFiat,
  getTransactions,
};