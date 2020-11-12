/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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
