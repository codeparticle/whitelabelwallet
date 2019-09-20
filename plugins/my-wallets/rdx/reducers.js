import types from './types';

export function walletsReducer(state = {}, action) {
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
    case types.SET_SELECTED_WALLET_ADDRESSES: {
      return {
        ...state,
        addresses: action.payload,
      };
    };
    case types.SET_SELECTED_WALLET_TRANSACTIONS: {
      return {
        ...state,
        transactions: action.payload,
      };
    };
    default:
      return state;
  }
}