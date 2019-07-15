import { takeLatest } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/track-requests';
import types from 'rdx/modules/auth/types';
import login from 'rdx/modules/auth/sagas/login';
import logout from 'rdx/modules/auth/sagas/logout';

function* watchAuthSagas() {
  yield trackRequests(takeLatest, types.REQUEST_LOGIN, login);
  yield trackRequests(takeLatest, types.REQUEST_LOGOUT, logout);
}

export default watchAuthSagas;
