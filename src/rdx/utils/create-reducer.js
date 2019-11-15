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
