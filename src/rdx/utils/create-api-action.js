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
