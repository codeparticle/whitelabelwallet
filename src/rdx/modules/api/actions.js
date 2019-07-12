/**
 * API Actions Automatically Generated (Do not add extra actions to this file)
 * @author Ericky Dos Santos
 * @file actions.js
 */

import Case from 'case';
import createAction from 'rdx/utils/create-action';
import createApiAction from 'rdx/utils/create-api-action';
import { API_ENDPOINTS } from 'rdx/api';
import { API_REQUEST_TYPES, RESET_TYPE } from 'rdx/constants';

export default {
  ...(Object.keys(API_ENDPOINTS).reduce((acc, method) => ({
    ...acc,
    ...Object.keys(API_ENDPOINTS[method]).reduce((innerAcc, endpointKey) => {
      const actionKey = Case.camel(`${Case.lower(method)}_${Case.lower(endpointKey)}`);
      const types = API_REQUEST_TYPES.map(dataRequestType => `${method}_${endpointKey}_${dataRequestType}`);
      const url = API_ENDPOINTS[method][endpointKey];

      types.forEach((type) => {
        innerAcc[Case.camel(type)] = payload => createAction(type, payload);
      });

      innerAcc[actionKey] = payload => createApiAction(types, method, url, payload);

      // Reset to initial state action
      const resetType = `${method}_${endpointKey}_${RESET_TYPE}`;
      innerAcc[Case.camel(resetType)] = () => createAction(resetType);

      return innerAcc;
    }, {}),
  }), {})),
};
