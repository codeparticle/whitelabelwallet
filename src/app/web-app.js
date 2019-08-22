import React, { Fragment, useEffect } from 'react';
import { IonApp } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';
import configureStore from 'rdx/configure-store';
import registerServiceWorker from 'lib/register-service-worker';
import { MediaProvider } from '@codeparticle/whitelabelwallet.styleguide';
import {
  AuthGuard,
  ConnectedIntlProvider,
  RootHelmet,
  RootRouter,
  ManagerContext,
} from 'global-components';
import { WebManager } from 'api/web';

const { SplashScreen } = Plugins;

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

const manager = new WebManager();

// IMPORTANT: persistgate will save the state into localStorage
// and load it from there; to use a new initialState, go to
// console -> Application Tab -> Local Storage
// remove "persist:root" and reload the app
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <ConnectedIntlProvider>
        <ManagerContext.Provider value={manager}>
          <MediaProvider>
            <PersistGate persistor={persistor}>
              <ConnectedRouter history={history}>
                <IonApp>
                  <AuthGuard>
                    <RootHelmet />
                    <RootRouter />
                  </AuthGuard>
                </IonApp>
              </ConnectedRouter>
            </PersistGate>
          </MediaProvider>
        </ManagerContext.Provider>
      </ConnectedIntlProvider>
    </Provider>
  );
};

registerServiceWorker();

export {
  App,
  manager,
  store,
};
