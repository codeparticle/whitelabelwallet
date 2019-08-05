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
import { SqlService, UpdateService } from '../../db';
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
   * Sets the SqlService Instance
   * @param {Object} dbFile : database file returned by fileService
   */
  startSqlService(dbFile) {
    log.debug('ElectronRendererService::startSqlService called');
    SqlService.file = dbFile;
    this.sqlService = SqlService.instance;
  }

  /**
   * Generates a new DB
   */
  generateDatabase() {
    log.debug('ElectronRendererService::generateDatabase called');
    this.startSqlService();

    return new Promise(resolve => {
      this.sqlService.generateTables().then(() => {
        resolve(true);
      });
    });
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
          const dbBinary = new Uint8Array(buffer);

          this.startSqlService(dbBinary);
          UpdateService().then((updated) => {
            if (updated) {
              this.saveDatabase(username, password);
            }
          });
        } else {
          log.error('ElectronAppService::loadDatabase not found');
          ipcRenderer.send(DELETE_LOGS);
        }

        resolve(imported);
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
  saveDatabase(username, password) {
    log.debug('ElectronRendererService::saveDatabase called');
    const dbBinary = this.sqlService.exportDatabase();

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
