import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from 'rdx/configure-store';
import { ConnectedIntlProvider } from 'global-components';

const history = createBrowserHistory();
const { store } = configureStore(history);

const TestApp = ({ children }) => (
  <Provider store={store}>
    <ConnectedIntlProvider>
      <ConnectedRouter history={history}>
        {children}
      </ConnectedRouter>
    </ConnectedIntlProvider>
  </Provider>
);

export {
  TestApp,
};
