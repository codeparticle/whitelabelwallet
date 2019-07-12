/**
 * API Reducers Automatically Generated (Do not add extra reducers to this file)
 * @author Ericky Dos Santos
 * @file reducers.js
 */

import Case from 'case';
import createReducer from 'rdx/utils/create-reducer';
import { API_ENDPOINTS } from 'rdx/api';
import { API_METHOD_GET, API_REQUEST_TYPES, RESET_TYPE } from 'rdx/constants';

const initialState = {
  dataLoaded: false,
  fetching: false,
  error: null,
  payload: null,
};
const initialApiState = {};

const apiReducers = Object.keys(API_ENDPOINTS).reduce((acc, method) => ({
  ...acc,
  ...Object.keys(API_ENDPOINTS[method]).reduce((innerAcc, endpointKey) => {
    const parsedMethod = Case.lower(method === API_METHOD_GET ? '' : method);
    const reducerName = Case.camel(`${parsedMethod}_${Case.lower(endpointKey)}_data`);
    const [
      request,
      success,
      error,
      reset,
    ] = API_REQUEST_TYPES.concat(RESET_TYPE).map(dataRequestType => `${method}_${endpointKey}_${dataRequestType}`);
    const reducers = {};

    // REQUEST
    reducers[request] = state => ({
      ...state,
      [reducerName]: {
        ...state[reducerName],
        fetching: true,
        error: null,
      },
    });

    // SUCCESS
    reducers[success] = (state, action) => ({
      ...state,
      [reducerName]: {
        ...state[reducerName],
        dataLoaded: true,
        fetching: false,
        payload: action.payload,
      },
    });

    // ERROR
    reducers[error] = (state, action) => ({
      ...state,
      [reducerName]: {
        ...state[reducerName],
        fetching: false,
        error: action.payload,
      },
    });

    // RESET
    reducers[reset] = state => ({
      ...state,
      [reducerName]: {
        ...initialState,
      },
    });

    [request, success, error, reset].forEach(type => Object.defineProperty(reducers[type], 'name', { value: type }));

    initialApiState[reducerName] = initialState;

    return {
      ...innerAcc,
      ...reducers,
    };
  }, {}),
}), {});

export default {
  api: createReducer(initialApiState, apiReducers),
};
