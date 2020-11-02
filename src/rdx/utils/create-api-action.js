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
 * Creates a generic api action
 * @author Ericky Dos Santos
 * @file create-api-action.js
 */

import { generatePath } from 'react-router';
import createAction from './create-action';
import { api } from '../api';

/**
 * Creates a generic api action based on types, method, url, and configuration passed to it
 * @param {array} types - REQUEST, SUCCESS, ERROR types in that same order
 * @param {string} method - Method of the api call
 * @param {string} url - Url to hit with the api call
 * @param {Object} config - Config Object {
 *   @property {Object} body - Body of the api call (usually used on POST requests)
 *   @property {Object} pathParams - Query params that are replaced in the url path
 *   @property {Object} queryParams - Query params that are added to the url
 * }
 * @returns {function} Async Action
 */
export default function createApiAction(types, method, url, {
  body,
  pathParams,
  queryParams,
} = {}) {
  return async (dispatch) => {
    dispatch(createAction(types[0]));

    try {
      const { data } = await api.request({
        method,
        url: generatePath(url, pathParams),
        data: body,
        params: queryParams,
      });

      dispatch(createAction(types[1], data));
    } catch (err) {
      console.error(err);

      dispatch(createAction(types[2], err));
    }
  };
}
