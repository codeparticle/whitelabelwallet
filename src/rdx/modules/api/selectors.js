/**
 * API Selectors Automatically Generated (Do not add extra selectors to this file)
 * @author Ericky Dos Santos
 * @file selectors.js
 */

import Case from 'case';
import { get } from 'lodash';
import { API_ENDPOINTS } from 'rdx/api';
import { API_METHOD_GET } from 'rdx/constants';

export default {
  ...(Object.keys(API_ENDPOINTS).reduce((acc, method) => ({
    ...acc,
    ...Object.keys(API_ENDPOINTS[method]).reduce((innerAcc, endpointKey) => {
      const parsedMethod = Case.lower(method === API_METHOD_GET ? '' : method);
      const lowerEndpointKey = Case.lower(endpointKey);
      const reducerName = Case.camel(`${parsedMethod}_${lowerEndpointKey}_data`);
      const selectorKey = Case.camel(`get_${parsedMethod}_${lowerEndpointKey}_data`);

      return {
        ...innerAcc,
        [selectorKey]: state => get(state.api, reducerName, null),
      };
    }, {}),
  }), {})),
};
