// use window.require to prevent requiring from server side which causes import bug
import {
  CHECK_DATABASE,
  CHECKED_DATABASE,
  CREATE_MENU,
  DELETE_LOGS,
  FETCH_DATABASE,
  FETCHED_DATABASE,
  OPEN_URL,
  PERFORM_STARTUP_SETUP,
  SAVE_DATABASE,
  SAVED_DATABASE,
} from '../ipc-events';
const { ipcRenderer, remote } = window.require('electron');
const log = remote.require('electron-log');

export class ElectronRendererService {
  // transmit event to main service to perform startup functions
  performStartupService() {
    ipcRenderer.send(PERFORM_STARTUP_SETUP);
  }

  initDeepLink(history) {
    ipcRenderer.on(OPEN_URL, (event, url) => {
      if (url.includes('api/')) {
        history.push(`/${url}`);
      }
    });
  }

  createAppMenus(intl) {
    log.debug('ElectronRendererService::createAppMenus called');
    ipcRenderer.send(CREATE_MENU, intl);
  }

  /**
   * Attempt to import database based on login credentials
   * @param {string} username : username fetched from login page
   * @param {string} password : password passed in by user
   */
  loadDatabase(username, password) {
    log.debug('ElectronAppService::loadDatabase called');

    return new Promise(resolve => {
      ipcRenderer.once(FETCHED_DATABASE, (event, imported, buffer) => {
        if (imported) {
          log.debug('ElectronAppService::loadDatabase success');

          resolve(new Uint8Array(buffer));
        } else {
          log.error('ElectronAppService::loadDatabase not found');
          ipcRenderer.send(DELETE_LOGS);
          resolve(false);
        }
      });

      ipcRenderer.send(FETCH_DATABASE, username, password);
      ipcRenderer.send(DELETE_LOGS, log.transports.file.file);
    });
  }

  /**
   * Saves the current DB given the user information
   * @param {string} username : username fetched from login page
   * @param {string} password : password passed in by user
   */
  saveDatabase(username, password, dbBinary) {
    log.debug('ElectronRendererService::saveDatabase called');

    return new Promise(resolve => {
      ipcRenderer.once(SAVED_DATABASE, (event, saved) => {
        log.debug('ElectronRendererService::saveDatabase database saved');

        resolve(saved);
      });

      ipcRenderer.send(SAVE_DATABASE, username, password, dbBinary);
    });
  }

  /**
   * Checks the database exists
   * @param {string} username : username fetched from login page
   * @param {string} password : password passed in by user
   */
  checkDatabaseExists(username, password) {
    log.debug('ElectronAppService::checkDatabase called');

    return new Promise(resolve => {
      ipcRenderer.once(CHECKED_DATABASE, (event, exists) => {
        resolve(exists);
      });

      ipcRenderer.send(CHECK_DATABASE, username, password);
    });
  }
}
