import types from './types';

const initialState = {
  toAddress: {},
  fromAddress: {},
};

export function sendFundsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_FROM_ADDRESS: {
      return {
        ...state,
        fromAddress: action.payload,
      };
    };
    case types.SET_TO_ADDRESS: {
      return {
        ...state,
        toAddress: action.payload,
      };
    };
    default:
      return state;
  }
}