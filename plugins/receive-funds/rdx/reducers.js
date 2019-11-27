import types from './types';
import { createPluginReducer } from 'rdx/utils/create-reducer';

const initialState = {
  address: '',
  amount: '',
  preSelectedReceiver: null,
};

export const receiveFundsReducer = createPluginReducer(initialState, {
  [types.PRE_SELECT_RECEIVER](state, action) {
    return {
      ...state,
      preSelectedReceiver: action.payload,
    };
  },
  [types.SET_ADDRESS](state, action) {
    return {
      ...state,
      address: action.payload,
    };
  },
  [types.SET_AMOUNT](state, action) {
    return {
      ...state,
      amount: action.payload,
    };
  },
});
