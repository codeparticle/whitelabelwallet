/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
import { all, call, select } from 'redux-saga/effects';
import Api from 'rdx/utils/api';
import authSelectors from 'rdx/modules/auth/selectors';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const formatServerConnectionError = (e) => {
  // some sort of connection error
  if (process.env.NODE_ENV === 'development') {
    console.warn(e);
  }
  const error = { text: 'There was an error connecting with the server' };
  return { success: false, data: null, error };
};

export const formatResponse = (response) => {
  if (response.error) {
    // TODO put other error data in there maybe
    const error = { text: response.message };
    return { success: false, error, data: null };
  }
  return { success: true, error: null, data: response };
};

const composeRequestManager = (verb) => {
  function* manageRequest(route, params) {
    const url = API_ENDPOINT + route;
    const authToken = yield select(authSelectors.getAuthToken);
    try {
      const response = yield call(Api.xhr, url, verb, params, authToken);
      return formatResponse(response);
    } catch (e) {
      return formatServerConnectionError(e);
    }
  }
  return manageRequest;
};

const makeRequest = {
  delete: composeRequestManager('DELETE'),
  get: composeRequestManager('GET'),
  patch: composeRequestManager('PATCH'),
  post: composeRequestManager('POST'),
  put: composeRequestManager('PUT'),
};

export default makeRequest;

export function* makeMultipleRequests(requestArray) {
  const authToken = yield select(authSelectors.getAuthToken);
  const requests = requestArray.map(({ url, verb, params }) => (
    call(Api.xhr, url, verb, params, authToken)
  ));
  try {
    const responses = yield all(requests);
    return responses.map(response => formatResponse(response));
  } catch (e) {
    return formatServerConnectionError(e);
  }
}
