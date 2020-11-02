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
import React from 'react';
import { configure } from 'enzyme';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localeData from 'translations/locales';

const DEFAULT_MESSAGES = localeData.en;

global.shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallowWithIntl(component, { context });
};

global.mountWithStore = (component, store) => {
  const context = {
    store,
  };
  return mountWithIntl(component, { context });
};
// add jsdom
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
//
configure({ adapter: new Adapter() });

// Create IntlProvider to retrieve React Intl context
const intlProvider = new IntlProvider(
  { locale: 'en', messages: DEFAULT_MESSAGES },
  {}
);
const { intl } = intlProvider.getChildContext();

// `intl` prop is required when using injectIntl HOC
const nodeWithIntlProp = node => React.cloneElement(node, { intl });

// shallow() with React Intl context
global.shallowWithIntl = (node, { context, ...options } = {}) => {
  return shallow(nodeWithIntlProp(node), {
    ...options,
    context: { ...context, intl },
  });
};

// mount() with React Intl context
global.mountWithIntl = (
  node,
  { context, childContextTypes, ...options } = {}
) => {
  return mount(nodeWithIntlProp(node), {
    ...options,
    context: { ...context, intl },
    childContextTypes: {
      intl: intlShape,
      ...childContextTypes,
    },
  });
};
