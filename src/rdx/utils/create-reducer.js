export default function createReducer(initialState, handlers) {
  if (handlers.hasOwnProperty(undefined)) {  // eslint-disable-line
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
    // single action
    } else if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
