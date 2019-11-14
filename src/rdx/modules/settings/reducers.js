import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/settings/types';
import { THEME_KEYS } from '@codeparticle/whitelabelwallet.styleguide';

const { LIGHT } = THEME_KEYS;

export const initialState = {
  locale: 'en',
  theme: LIGHT,
};

export default {
  settings: createReducer(initialState, {
    [types.SET_SETTINGS](state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    [types.SET_THEME](state, action) {
      return {
        ...state,
        theme: action.payload,
      };
    },
  }, true),
};
