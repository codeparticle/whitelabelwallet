import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';
import configureStore from 'rdx/configure-store';
import { ConnectedIntlProvider } from 'global-components';

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

const TestApp = ({ children }) => (
  <Provider store={store}>
    <ConnectedIntlProvider>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </PersistGate>
    </ConnectedIntlProvider>
  </Provider>
);

export {
  TestApp,
};
