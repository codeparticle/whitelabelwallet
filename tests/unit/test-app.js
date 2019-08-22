import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { MediaProvider } from '@codeparticle/whitelabelwallet.styleguide';
import configureStore from 'rdx/configure-store';
import { ConnectedIntlProvider } from 'global-components';

const history = createBrowserHistory();
const { store } = configureStore(history);

const TestApp = ({ children }) => (
  <Provider store={store}>
    <ConnectedIntlProvider>
      <MediaProvider>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </MediaProvider>
    </ConnectedIntlProvider>
  </Provider>
);

export {
  TestApp,
};
