import { put } from 'redux-saga/effects';
import makeRequest from 'rdx/utils/make-request';
import getErrorActions from 'rdx/utils/get-error-actions';
import actions from 'rdx/actions';

function* logout() {
  const { success, data, error } = yield* makeRequest.get('/logout');
  if (success) {
    yield put(actions.setUser(data));
    yield put(actions.navigate('/login'));
    yield put(actions.setAuthToken(''));
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default logout;
