import createReducer from 'rdx/utils/create-reducer';
import types from './types';

export default {
  contacts: createReducer([], {
    [types.SET_CONTACTS](state, action) {
      return [
        ...action.payload,
      ];
    },
  }),
};
