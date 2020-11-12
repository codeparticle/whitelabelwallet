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
import { uniqBy } from 'lodash';
import { createPluginReducer } from 'rdx/utils/create-reducer';

const initialState = {
  selectedAddress: { name: '' },
  transactions: [],
  wallets: [],
};

export const walletReducer = createPluginReducer(initialState, {
  [types.SET_WALLETS](state, action) {
    return {
      ...state,
      wallets: action.payload,
    };
  },
  [types.SET_SELECTED_WALLET](state, action) {
    return {
      ...state,
      selected: action.payload,
    };
  },
  [types.SET_SELECTED_ADDRESS](state, action) {
    return {
      ...state,
      selectedAddress: action.payload,
    };
  },
  [types.SET_SELECTED_WALLET_ADDRESSES](state, action) {
    return {
      ...state,
      addresses: action.payload,
    };
  },
  [types.SET_SELECTED_WALLET_TRANSACTIONS](state, action) {
    return {
      ...state,
      transactions: uniqBy([...state.transactions, ...action.payload], transaction => transaction.id),
    };
  },
  [types.SET_SELECTED_TRANSACTIONS_SEARCH_RESULTS](state, action) {
    return {
      ...state,
      transactions: uniqBy([...action.payload], transaction => transaction.id),
    };
  },
  [types.CLEAR_SELECTED_WALLET_TRANSACTIONS](state) {
    return {
      ...state,
      transactions: [],
    };
  },
});
