import types from './types';

export function walletsReducer(state = [], action) {
  switch (action.type) {
    case types.SET_WALLETS: {
      return action.payload;
    }
    default:
      return state;
  }
}