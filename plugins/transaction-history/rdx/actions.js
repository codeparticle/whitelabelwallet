import types from './types';
import createAction from 'rdx/utils/create-action';

const setAddresses = payload => createAction(types.SET_ALL_ADDRESSES, payload);
const setTransactions = payload => createAction(types.SET_TRANSACTIONS, payload);
const setTransactionsSearchResults = payload => createAction(types.SET_TRANSACTIONS_SEARCH_RESULTS, payload);

export {
  setAddresses,
  setTransactions,
  setTransactionsSearchResults,
};