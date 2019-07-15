import { put } from 'redux-saga/effects';
import { get } from 'lodash';
import makeRequest from 'rdx/utils/make-request';
import getErrorActions from 'rdx/utils/get-error-actions';
import actions from 'rdx/actions';
import { LOGIN_FORM } from 'rdx/modules/messages/constants';

function* login({ payload }) {
  const { email, password } = payload;
  const { success, data, error } = yield* makeRequest.post('/login', { email, password });
  const token = get(data, 'token');
  if (success && token) {
    yield put(actions.setAuthToken(token));
    yield put(actions.navigate('/'));
  } else {
    return getErrorActions({ error, target: LOGIN_FORM });
  }
  return null;
}

export default login;
