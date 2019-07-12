import { environment } from '@utils';

let log;
if (environment.isElectron()) {
  const { remote } = window.require('electron');
  log = remote.require('electron-log');
} else {
  // TODO implement logger for web
  // TODO figure out why require() statement here is not working
  // log = require('electron-log');
  log = console;
}


export const logger = {

  debug: (data) => {
    log.debug(data);
  },

  info: (data) => {
    log.info(data);
  },

  error: (data) => {
    log.error(data);
  },

  warn: (data) => {
    log.info(data);
  },
};
