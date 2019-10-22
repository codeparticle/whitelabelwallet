import types from './types';
import { uniqBy } from 'lodash';

const initialState = {
  transactions: [],
  addresses: [],
};

export function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ALL_ADDRESSES: {
      return {
        ...state,
        addresses: action.payload,
      };
    };
    case types.SET_TRANSACTIONS: {
      return {
        ...state,
        transactions: action.payload,
      };
    };
    case types.SET_TRANSACTIONS_SEARCH_RESULTS: {
      return {
        ...state,
        transactions: uniqBy([...action.payload], transaction => transaction.id),
      };
    };
    default:
      return state;
  }
}