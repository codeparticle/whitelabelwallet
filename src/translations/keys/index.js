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
import { defineMessages } from 'react-intl';
import { AUTH } from './auth';
import { BLOCKCHAIN } from './blockchain';
import { COMMON } from './common';
import { FORM } from './form';
import { HELMET } from './helmet';
import { MENU } from './menu';
import { SETTINGS } from './settings';

export const parseIntlText = (intl, text) => {
  if (typeof text === 'object' && text.id) {
    return intl.formatMessage(text);
  }

  return text;
};

const APP_MESSAGES = defineMessages({
  APP_NAME: {
    id: 'app-name',
    description: 'App name',
    defaultMessage: 'White Label Wallet',
  },
  LABEL: {
    id: 'label',
    description: 'Label of the locale',
    defaultMessage: 'English',
  },
  PAGE_NOT_FOUND: {
    id: 'page-not-found',
    description: 'Page not found message',
    defaultMessage: 'The Page you requested was not found!',
  },
});

export const TRANSLATION_KEYS = {
  AUTH,
  BLOCKCHAIN,
  COMMON,
  FORM,
  HELMET,
  MENU,
  SETTINGS,
  ...APP_MESSAGES,
};
