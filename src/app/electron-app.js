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
import React, { Component, Fragment, useEffect } from 'react';
import { IonApp } from '@ionic/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { PersistGate } from 'redux-persist/integration/react';
import { connect } from 'react-redux';
import { getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import { environment } from 'lib/utils';
import configureStore from 'rdx/configure-store';
import { MediaProvider } from '@codeparticle/whitelabelwallet.styleguide';
import {
  AuthGuard,
  ConnectedIntlProvider,
  ConnectedThemeProvider,
  ManagerContext,
  RootHelmet,
  RootRouter,
} from 'global-components';
import { ElectronRendererManager } from 'api/electron/renderer';
import './app.scss';

const { remote } = window.require('electron');
// const { dialog } = remote.require('electron');
const log = require('electron-log');

const history = createMemoryHistory();
const { store, persistor } = configureStore(history);

const manager = ElectronRendererManager.instance;

const AppWithStore = ({
  children,
  locale,
  messages,
}) => {
  useEffect(() => {
    log.debug('ElectronApp:: starting App Manager');
    manager.performStartupService();
    manager.initDeepLink(history);

    const intlProvider = new IntlProvider({
      locale,
      messages,
    }, {});
  
    const { intl } = intlProvider.getChildContext();
    // manager.createAppMenus(intl);
  }, []);

  if (window.location.pathname.includes('index.html') && environment.isDev()) {
    return <Redirect to='/' />;
  }

  return (
    <IonApp className='app is-desktop'>
      {children}
    </IonApp>
  );
};

const stateMapper = getRdxSelectionMapper({
  locale: 'getLang',
  messages: 'getMessages',
});

const AppWithStoreContainer = connect(stateMapper)(AppWithStore);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedIntlProvider>
        <ManagerContext.Provider value={manager}>
          <MediaProvider>
            <ConnectedThemeProvider>
              <PersistGate persistor={persistor}>
                <ConnectedRouter history={history}>
                  <AppWithStoreContainer>
                    <AuthGuard>
                      <RootHelmet />
                      <RootRouter />
                    </AuthGuard>
                  </AppWithStoreContainer>
                </ConnectedRouter>
              </PersistGate>
            </ConnectedThemeProvider>
          </MediaProvider>
        </ManagerContext.Provider>
      </ConnectedIntlProvider>
    </Provider>
  );
};

export {
  App,
  manager,
  store,
};
