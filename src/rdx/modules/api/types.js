/**
 * API Types Automatically Generated (Do not add extra types to this file)
 * @author Ericky Dos Santos
 * @file types.js
 */

import { API_ENDPOINTS } from 'rdx/api';
import { API_REQUEST_TYPES, RESET_TYPE } from 'rdx/constants';

export default {
  ...(Object.keys(API_ENDPOINTS).reduce((acc, method) => {
    const typePrefix = `${method}_DATA`;

    return {
      ...acc,
      ...Object.keys(API_ENDPOINTS[method]).reduce((innerAcc, endpointKey) => {
        const type = `${typePrefix}_${endpointKey}`;

        API_REQUEST_TYPES.concat(RESET_TYPE).forEach((dataRequestType) => {
          const finalType = `${type}_${dataRequestType}`;

          innerAcc[finalType] = finalType;
        });

        return innerAcc;
      }, {}),
    };
  }, {})),
};
