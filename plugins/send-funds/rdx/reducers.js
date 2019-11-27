import types from './types';
import { createPluginReducer } from 'rdx/utils/create-reducer';

const initialState = {
  amount: '',
  fee: '',
  fromAddress: '',
  memo: '',
  toAddress: '',
  preSelectedFromAddress: null,
  preSelectedToAddress: null,
};

export const sendFundsReducer = createPluginReducer(initialState, {
  [types.PRE_SELECT_FROM_ADDRESS](state, action) {
    return {
      ...state,
      preSelectedFromAddress: action.payload,
    };
  },
  [types.PRE_SELECT_TO_ADDRESS](state, action) {
    return {
      ...state,
      preSelectedToAddress: action.payload,
    };
  },
  [types.SET_AMOUNT](state, action) {
    return {
      ...state,
      amount: action.payload,
    };
  },
  [types.SET_FEE](state, action) {
    return {
      ...state,
      fee: action.payload,
    };
  },
  [types.SET_FROM_ADDRESS](state, action) {
    return {
      ...state,
      fromAddress: action.payload,
    };
  },
  [types.SET_MEMO](state, action) {
    return {
      ...state,
      memo: action.payload,
    };
  },
  [types.SET_TO_ADDRESS](state, action) {
    return {
      ...state,
      toAddress: action.payload,
    };
  },
  [types.RESET_FIELDS]() {
    return initialState;
  },
});
