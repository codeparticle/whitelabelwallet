import createReducer from 'rdx/utils/create-reducer';
import types from './types';

export const initialState = {
  address: {},
  contact: {},
  wallet: {},
};

export default {
  selected: createReducer(initialState, {
    [types.SET_ADDRESS](state, action) {
      return {
        ...state,
        address: action.payload,
      };
    },
    [types.SET_CONTACT](state, action) {
      return {
        ...state,
        contact: action.payload,
      };
    },
    [types.SET_WALLET](state, action) {
      return {
        ...state,
        wallet: action.payload,
      };
    },
  }, true),
};
