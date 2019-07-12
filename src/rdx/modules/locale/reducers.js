import moment from 'moment';
import createReducer from 'rdx/utils/create-reducer';
import types from 'rdx/modules/locale/types';
import localeData from 'translations/locales';

const DEFAULT_LANG = 'en';
const DEFAULT_MESSAGES = localeData[DEFAULT_LANG];

export default {
  locale: createReducer({
    lang: DEFAULT_LANG,
    messages: DEFAULT_MESSAGES,
  },
  {
    [types.SET_LOCALE](state, action) {
      const lang = localeData[action.locale] ? action.locale : DEFAULT_LANG;
      const mergedMessages = Object.assign({}, DEFAULT_MESSAGES, localeData[action.locale] || {});
      moment.locale(action.locale);

      return { lang, messages: mergedMessages };
    },
  }),
};
