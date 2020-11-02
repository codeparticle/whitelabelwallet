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
import types from 'rdx/types';
import { createSelector } from 'reselect';

const getActiveRequests = state => state.activeRequests;

const getActiveRequestType = type => createSelector(
  getActiveRequests,
  activeRequests => activeRequests.filter(ar => ar.type === type).length > 0,
);

// for particular AR instance selection from state
export const activeRequestExists = ({
  activeRequests, id, type, data, keysToCheck,
}) => {
  const index = activeRequests.findIndex((ar) => {
    if (id) {
      // if unique id used for check, no need to go further
      return ar.id === id;
    }
    // next filter by type (if applicable)
    if (type) {
      if (type !== ar.type) {
        return false;
      }
    }
    if (data) {
      const arPayload = ar.payload;
      const keys = keysToCheck || Object.keys(data);
      // check each activeRequest's payload for matches to supplied data
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (arPayload[key] && arPayload[key] !== data[key]) {
          return false;
        }
      }
    }
    return true;
  });
  return index >= 0;
};

export default {
  getActiveRequests,
  // specific request types
  isGetUserRequestActive: getActiveRequestType(types.REQUEST_USER),
};
