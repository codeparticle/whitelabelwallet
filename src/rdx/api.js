/**
 * This file contains the basic configuration for the api calls
 * @author Ericky Dos Santos
 * @file api.js
 */

import axios from 'axios';
import { API_METHOD_GET, API_METHOD_POST } from 'rdx/constants';

const {
  REACT_APP_API_ENDPOINT,
} = process.env;

// Base url of the node server
export const BASE_URL = `${REACT_APP_API_ENDPOINT}/api/`;

/**
 * All endpoints of the aplication.
 * The rdx modules uses this variable to create actions/reducers/selectors/types.
 * Actions will be named in the following convention:
 *  getTestRequest, getTestSuccess, getTestError, getTestReset
 *  postTestRequest, postTestSuccess, postTestError, postTestReset
 * Reducers will be named in the following convention:
 *  testData
 *  postTestData
 * Selectors will be named in the following convention:
 *  getTestData
 *  getPostTestData
 * Types will be named in the following convention:
 *  GET_TEST_DATA_REQUEST, GET_TEST_DATA_SUCCESS, GET_TEST_DATA_ERROR, GET_TEST_DATA_RESET
 *  POST_TEST_DATA_REQUEST, POST_TEST_DATA_SUCCESS, POST_TEST_DATA_ERROR, POST_TEST_DATA_RESET
 */
export const API_ENDPOINTS = {
  [API_METHOD_GET]: {},
  [API_METHOD_POST]: {},
};

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
