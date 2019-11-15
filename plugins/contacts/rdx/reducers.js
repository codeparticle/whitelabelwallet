import types from './types';
import { createPluginReducer } from 'rdx/utils/create-reducer';

export const contactsReducer = createPluginReducer([], {
  [types.SET_CONTACTS](state, action) {
    return action.payload;
  },
});
