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
