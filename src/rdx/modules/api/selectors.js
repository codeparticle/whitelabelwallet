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
