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
import appTypes from 'rdx/modules/app/types';

export default function createReducer(initialState, handlers, resetOnLogout = false) {
  if (handlers.hasOwnProperty(undefined)) {
    console.error('reducer created with undefined handler, check your type constants');
  }
  return function reducer(state = initialState, action) {
    // if is an action batch
    if (action.type === 'BATCH_ACTIONS') {
      const batchedActions = action.payload;
      if (!Array.isArray(batchedActions)) {
        return state;
      }
      // loop through actions
      for (let i = 0; i < batchedActions.length; i += 1) {
        const thisAction = batchedActions[i];
        if (handlers[thisAction.type]) {
          // apply first relevant handler
          return handlers[thisAction.type](state, thisAction);
        }
      }

    } else if (action.type === appTypes.LOGOUT) {
      if (initialState !== undefined && resetOnLogout) {
        return initialState;
      }
    // single action
    } else if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

/**
 * Plugins should always use this method to create a reducer. This method will automatically reset a plugin's
 * state on logout. Usage is the same as `createReducer`
 * See `plugins/README.md` for documentation
 * @returns {Object} reducer
 * @param {any} initialState
 * @param {Function[]} handlers
 */
export function createPluginReducer(initialState, handlers) {
  return createReducer(initialState, handlers, true);
}
