import types from './types';
import { uniqBy } from 'lodash';
import { createPluginReducer } from 'rdx/utils/create-reducer';

const initialState = {
  transactions: [],
  addresses: [],
};

export const transactionsReducer = createPluginReducer(initialState, {
  [types.SET_ALL_ADDRESSES](state, action) {
    return {
      ...state,
      addresses: action.payload,
    };
  },
  [types.SET_TRANSACTIONS](state, action) {
    return {
      ...state,
      transactions: action.payload,
    };
  },
  [types.SET_TRANSACTIONS_SEARCH_RESULTS](state, action) {
    return {
      ...state,
      transactions: uniqBy([...action.payload], transaction => transaction.id),
    };
  },
});
