import moment from 'moment';
import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/locale/types';
import localeData from 'translations/locales';

const DEFAULT_LANG = 'en';
const DEFAULT_MESSAGES = localeData[DEFAULT_LANG];

const setLocale = (pluginLocales = {}, locale) => {
  const parsedPluginLocales = Object.entries(pluginLocales).map(([, locales]) => {
    if (locales[locale]) {
      return locales[locale];
    } else if (locales[DEFAULT_LANG]) {
      return locales[DEFAULT_LANG];
    }

    return null;
  }).filter((locale) => !!locale);

  const lang = Object.assign({}, ...parsedPluginLocales, localeData[locale] ? locale : DEFAULT_LANG);
  const mergedMessages = Object.assign({}, DEFAULT_MESSAGES, localeData[locale] || {});
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

      setLocale(pluginLocales, state.lang);

      return {
        ...state,
        pluginLocales,
      };
    },
  },
  {
    [types.SET_LOCALE](state, action) {
      return setLocale(state.pluginLocales, action.locale);
    },
  }),
};
