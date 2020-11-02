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
import types from './types';
import { createPluginReducer } from 'rdx/utils/create-reducer';

const initialState = {
  amount: '',
  fee: '',
  fromAddress: '',
  memo: '',
  toAddress: '',
  preSelectedFromAddress: null,
  preSelectedToAddress: null,
};

export const sendFundsReducer = createPluginReducer(initialState, {
  [types.PRE_SELECT_FROM_ADDRESS](state, action) {
    return {
      ...state,
      preSelectedFromAddress: action.payload,
    };
  },
  [types.PRE_SELECT_TO_ADDRESS](state, action) {
    return {
      ...state,
      preSelectedToAddress: action.payload,
    };
  },
  [types.SET_AMOUNT](state, action) {
    return {
      ...state,
      amount: action.payload,
    };
  },
  [types.SET_FEE](state, action) {
    return {
      ...state,
      fee: action.payload,
    };
  },
  [types.SET_FROM_ADDRESS](state, action) {
    return {
      ...state,
      fromAddress: action.payload,
    };
  },
  [types.SET_MEMO](state, action) {
    return {
      ...state,
      memo: action.payload,
    };
  },
  [types.SET_TO_ADDRESS](state, action) {
    return {
      ...state,
      toAddress: action.payload,
    };
  },
  [types.RESET_FIELDS]() {
    return initialState;
  },
});
