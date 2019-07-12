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
import {
  ConnectedIntlProvider,
  RootHelmet,
  RootRouter,
} from 'global-components';
import { ElectronAppService } from 'api/electron/renderer';
import './app.scss';

const { remote } = window.require('electron');
const { dialog } = remote.require('electron');
const log = remote.require('electron-log');

const history = createMemoryHistory();
const { store, persistor } = configureStore(history);

const appService = new ElectronAppService();

const AppWithStore = ({
  children,
  locale,
  messages,
}) => {
  useEffect(() => {
    log.debug('ElectronApp:: starting App Service');
    appService.performStartupService();
    appService.initDeepLink(history);

    const intlProvider = new IntlProvider({
      locale,
      messages,
    }, {});
  
    const { intl } = intlProvider.getChildContext();
    appService.createAppMenus(intl);
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
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <AppWithStoreContainer>
              <RootHelmet />
              <RootRouter />
            </AppWithStoreContainer>
          </ConnectedRouter>
        </PersistGate>
      </ConnectedIntlProvider>
    </Provider>
  );
};

export {
  App,
  store,
};
