import types from './types';
import { uniqBy } from 'lodash';
import { createPluginReducer } from 'rdx/utils/create-reducer';

const initialState = {
  selectedAddress: { name: '' },
  transactions: [],
  wallets: [],
};

export const walletReducer = createPluginReducer(initialState, {
  [types.SET_WALLETS](state, action) {
    return {
      ...state,
      wallets: action.payload,
    };
  },
  [types.SET_SELECTED_WALLET](state, action) {
    return {
      ...state,
      selected: action.payload,
    };
  },
  [types.SET_SELECTED_ADDRESS](state, action) {
    return {
      ...state,
      selectedAddress: action.payload,
    };
  },
  [types.SET_SELECTED_WALLET_ADDRESSES](state, action) {
    return {
      ...state,
      addresses: action.payload,
    };
  },
  [types.SET_SELECTED_WALLET_TRANSACTIONS](state, action) {
    return {
      ...state,
      transactions: uniqBy([...state.transactions, ...action.payload], transaction => transaction.id),
    };
  },
  [types.SET_SELECTED_TRANSACTIONS_SEARCH_RESULTS](state, action) {
    return {
      ...state,
      transactions: uniqBy([...action.payload], transaction => transaction.id),
    };
  },
  [types.CLEAR_SELECTED_WALLET_TRANSACTIONS](state) {
    return {
      ...state,
      transactions: [],
    };
  },
});
