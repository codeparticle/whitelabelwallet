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
      console.log('========\n', 'do we need this?', '\n========');
      state.transactions ? state.transactions : state['transactions'] = [];
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    };
    default:
      return state;
  }
}