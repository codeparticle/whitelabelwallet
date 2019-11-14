import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/auth/types';

const initialState = '';

export default {
  authToken: createReducer(initialState, {
    [types.SET_AUTH_TOKEN](state, action) {
      return action.payload;
    },
  }, true),
};
