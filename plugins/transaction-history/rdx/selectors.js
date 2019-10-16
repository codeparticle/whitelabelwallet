import { get } from 'lodash';

const getTransactions = state => get(state, 'transactionsData.transactions', []);

export {
  getTransactions,
};