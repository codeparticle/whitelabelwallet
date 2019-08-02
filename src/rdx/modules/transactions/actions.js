import types from './types';
import createAction from 'rdx/utils/create-action';

export default {
  setTransactions: payload => createAction(types.SET_TRANSACTIONS, payload),
};
