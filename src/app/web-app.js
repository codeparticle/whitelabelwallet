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
  ConnectedThemeProvider,
  RootHelmet,
  RootRouter,
  ManagerContext,
} from 'global-components';
import { WebManager } from 'api/web';
import './app.scss';

const { SplashScreen } = Plugins;

const history = createBrowserHistory();
const { store, persistor } = configureStore(history);

const manager = WebManager.instance;

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
            <ConnectedThemeProvider>
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
            </ConnectedThemeProvider>
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
