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
