import { hot } from 'react-hot-loader/root';
import { environment } from 'lib/utils';

let appImport = null;

if (environment.isElectron()) {
  appImport = require('./electron-app');
} else {
  appImport = require('./web-app');
}

const { App, service, store } = appImport;

module.exports = {
  App: environment.isDev() ? hot(App) : App,
  service,
  store,
};
