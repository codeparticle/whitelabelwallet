import types from './types';

const initialState = {
  address: '',
  amount: '',
};

export function receiveFundsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ADDRESS: {
      return {
        ...state,
        address: action.payload,
      };
    }
    case types.SET_AMOUNT: {
      return {
        ...state,
        amount: action.payload,
      };
    }
    default:
      return state;
  }
}