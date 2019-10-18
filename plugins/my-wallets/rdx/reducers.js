import types from './types';
import { uniqBy } from 'lodash';

const initialState = {
  transactions: [],
  selectedAddress: { name: '' },
};

export function walletsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_WALLETS: {
      return {
        ...state,
        wallets: action.payload,
      };
    };
    case types.SET_SELECTED_WALLET: {
      return {
        ...state,
        selected: action.payload,
      };
    };
    case types.SET_SELECTED_ADDRESS: {
      return {
        ...state,
        selectedAddress: action.payload,
      };
    };
    case types.SET_SELECTED_WALLET_ADDRESSES: {
      return {
        ...state,
        addresses: action.payload,
      };
    };
    case types.SET_SELECTED_WALLET_TRANSACTIONS: {
      return {
        ...state,
        transactions: uniqBy([...state.transactions, ...action.payload], transaction => transaction.id),
      };
    };
    case types.SET_SELECTED_TRANSACTIONS_SEARCH_RESULTS: {
      return {
        ...state,
        transactions: uniqBy([...action.payload], transaction => transaction.id),
      };
    };
    case types.CLEAR_SELECTED_WALLET_TRANSACTIONS: {
      return {
        ...state,
        transactions: [],
      };
    };
    default:
      return state;
  }
}