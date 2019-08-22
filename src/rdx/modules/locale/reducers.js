import moment from 'moment';
import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/locale/types';
import localeData from 'translations/locales';

const DEFAULT_LANG = 'en';
const DEFAULT_MESSAGES = localeData[DEFAULT_LANG];

const setLocale = (pluginLocales = {}, locale) => {
  const parsedPluginLocales = Object.entries(pluginLocales).reduce((acc, [, locales]) => {
    Object.keys(locales).forEach((pluginLocale) => {
      if (!acc[pluginLocale]) {
        acc[pluginLocale] = {};
      }

      Object.assign(acc[pluginLocale], locales[pluginLocale] || {});
    });

    return acc;
  }, {});

  const lang = localeData[locale] ? locale : DEFAULT_LANG;
  const mergedMessages = Object.assign({}, DEFAULT_MESSAGES, parsedPluginLocales[lang], localeData[lang] || {});
  moment.locale(locale);

  return {
    lang,
    messages: mergedMessages,
    pluginLocales,
  };
};

export default {
  locale: createReducer({
    lang: DEFAULT_LANG,
    messages: DEFAULT_MESSAGES,
    pluginLocales: {},
  },
  {
    [types.PLUGIN_ADD_LOCALES](state, action) {
      const pluginLocales = {
        ...state.pluginLocales,
        [action.key]: action.locales,
      };

      return setLocale(pluginLocales, state.lang);
    },
  },
  {
    [types.SET_LOCALE](state, action) {
      return setLocale(state.pluginLocales, action.locale);
    },
  }),
};
