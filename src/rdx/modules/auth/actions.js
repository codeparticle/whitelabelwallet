import types from 'rdx/modules/auth/types';
import createAction from 'rdx/utils/create-action';

export default {
  setAuthToken: authToken => createAction(types.SET_AUTH_TOKEN, authToken),
  requestLogin: payload => createAction(types.REQUEST_LOGIN, payload),
  requestLogout: payload => createAction(types.REQUEST_LOGOUT, payload),
};
