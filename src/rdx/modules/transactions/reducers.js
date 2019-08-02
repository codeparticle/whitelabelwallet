import createReducer from 'rdx/utils/create-reducer';
import types from './types';

export default {
  transactions: createReducer([], {
    [types.SET_TRANSACTIONS](state, action) {
      return [
        ...action.payload,
      ];
    },
  }),
};
