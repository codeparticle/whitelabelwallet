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
import { configure, mount } from 'enzyme';
import { IntlProvider, intlShape } from 'react-intl';
import Adapter from 'enzyme-adapter-react-16';
import localeData from 'translations/locales';

configure({ adapter: new Adapter() });

// Create IntlProvider to retrieve React Intl context
const intlProvider = new IntlProvider(
  { locale: 'en', messages: localeData.en },
  {}
);
const { intl } = intlProvider.getChildContext();

// `intl` prop is required when using injectIntl HOC
const nodeWithIntlProp = node => React.cloneElement(node, { intl });

global.mountWithStore = (component, store) => {
  const context = {
    store,
  };
  return mountWithIntl(component, { context });
};

// mount() with React Intl context
global.mountWithIntl = (
  node,
  { context, childContextTypes, ...options } = {}
) => mount(nodeWithIntlProp(node), {
  ...options,
  context: { ...context, intl },
  childContextTypes: {
    intl: intlShape,
    ...childContextTypes,
  },
});
