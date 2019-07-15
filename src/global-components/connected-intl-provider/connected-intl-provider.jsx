import React from 'react';
import { connect } from 'react-redux';
import { getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import { IntlProvider } from 'react-intl';

const ConnectedIntlProvider = props => (
  <IntlProvider {...props}>
    {props.children}
  </IntlProvider>
);

const stateMapper = getRdxSelectionMapper({
  locale: 'getLang',
  messages: 'getMessages',
});

export default connect(stateMapper)(ConnectedIntlProvider);
