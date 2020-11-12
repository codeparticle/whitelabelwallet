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
import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/active-requests/types';

export default {
  activeRequests: createReducer([], {
    [types.ADD_ACTIVE_REQUEST](state, action) {
      const index = state.findIndex(ar => ar.id === action.payload.id);
      // do nothing if AR already in state
      if (index >= 0) {
        return state;
      }
      return state.concat(action.payload);
    },
    [types.REMOVE_ACTIVE_REQUEST](state, action) {
      const index = state.findIndex(ar => ar.id === action.payload.id);
      // do nothing if AR not in state
      if (index < 0) {
        return state;
      }
      const newState = [...state];
      newState.splice(index, 1);
      return newState;
    },
  }),
};
