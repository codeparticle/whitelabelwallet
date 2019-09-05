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
const { dialog } = remote.require('electron');
const log = remote.require('electron-log');

const history = createMemoryHistory();
const { store, persistor } = configureStore(history);

const manager = new ElectronRendererManager();

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
    manager.createAppMenus(intl);
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
