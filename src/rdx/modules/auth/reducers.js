import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/auth/types';

// change '' to a non-empty string to see app in loggedIn state
export default {
  authToken: createReducer('test', {
    [types.SET_AUTH_TOKEN](state, action) {
      return action.payload;
    },
  }),
};
