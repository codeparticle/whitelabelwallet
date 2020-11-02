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
