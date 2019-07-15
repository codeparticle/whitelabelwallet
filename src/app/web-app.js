import React, { Fragment } from 'react';
import { IonApp } from '@ionic/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';
import configureStore from 'rdx/configure-store';
import registerServiceWorker from 'lib/register-service-worker';
import {
  ConnectedIntlProvider,
  RootHelmet,
  RootRouter,
} from 'global-components';

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

// IMPORTANT: persistgate will save the state into localStorage
// and load it from there; to use a new initialState, go to
// console -> Application Tab -> Local Storage
// remove "persist:root" and reload the app
const App = () => (
  <Provider store={store}>
    <ConnectedIntlProvider>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <IonApp>
            <RootHelmet />
            <RootRouter />
          </IonApp>
        </ConnectedRouter>
      </PersistGate>
    </ConnectedIntlProvider>
  </Provider>
);

registerServiceWorker();

export {
  App,
  store,
};
