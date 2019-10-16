import types from './types';

const initialState = {
  amount: '',
  fromAddress: '',
  memo: '',
  toAddress: '',
};

export function sendFundsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_AMOUNT: {
      return {
        ...state,
        amount: action.payload,
      };
    }
    case types.SET_FROM_ADDRESS: {
      return {
        ...state,
        fromAddress: action.payload,
      };
    };
    case types.SET_MEMO: {
      return {
        ...state,
        memo: action.payload,
      };
    }
    case types.SET_TO_ADDRESS: {
      return {
        ...state,
        toAddress: action.payload,
      };
    };
    case types.RESET_FIELDS: {
      return initialState;
    }
    default:
      return state;
  }
}