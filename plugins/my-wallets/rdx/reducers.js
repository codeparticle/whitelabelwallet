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
    default:
      return state;
  }
}