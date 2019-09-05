import types from 'rdx/modules/settings/types';
import createAction from 'rdx/utils/create-action';

export default {
  setSettings: action => createAction(types.SET_SETTINGS, action),
  setTheme: action => createAction(types.SET_THEME, action),
};
