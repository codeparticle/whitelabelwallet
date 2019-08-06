import createReducer from 'rdx/utils/create-reducer';
import types from './types';

export default {
  wallets: createReducer([], {
    [types.SET_WALLETS](state, action) {
      return [
        ...action.payload,
      ];
    },
  }),
};
