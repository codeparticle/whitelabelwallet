import types from 'rdx/modules/locale/types';
import * as locales from './locales';
import pluginId from '../plugin-id';

const addLocales = () => {
  return {
    type: types.PLUGIN_ADD_LOCALES,
    key: pluginId,
    locales,
  };
};

export {
  addLocales,
};
