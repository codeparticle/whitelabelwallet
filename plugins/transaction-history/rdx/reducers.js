import types from './types';

const initialState = {
  transactions: [],
};

export function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_TRANSACTIONS: {
      return {
        ...state,
        transactions: action.payload,
      };
    };
    default:
      return state;
  }
}