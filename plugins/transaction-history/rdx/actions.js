import types from './types';
import createAction from 'rdx/utils/create-action';

const setTransactions = payload => createAction(types.SET_TRANSACTIONS, payload);

export {
  setTransactions,
};