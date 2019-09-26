import { hot } from 'react-hot-loader/root';
import { environment } from 'lib/utils';
import { blockchainManagers } from 'coins';

const { coin, isElectron } = environment;

let appImport = null;

if (isElectron()) {
  appImport = require('./electron-app');
} else {
  appImport = require('./web-app');
}

let BlockchainManager = blockchainManagers[coin];

if (typeof BlockchainManager === 'undefined')  {
  BlockchainManager = blockchainManagers.btc;
}

const { App, manager, store } = appImport;

module.exports = {
  App: environment.isDev() ? hot(App) : App,
  BlockchainManager,
  manager,
  store,
};
