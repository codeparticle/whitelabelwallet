import types from './types';

export function contactsReducer(state = [], action) {
  switch (action.type) {
    case types.SET_CONTACTS: {
      return action.payload;
    }
    default:
      return state;
  }
}
