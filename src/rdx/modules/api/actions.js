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
