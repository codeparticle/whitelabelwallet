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
} from 'api/electron/ipc-events';
import { DatabaseManager, UpdateManager } from 'api/db';
import { RenderManager } from 'api/render-manager';
const { ipcRenderer, remote } = window.require('electron');
const log = remote.require('electron-log');

export class ElectronRendererManager extends RenderManager {
  // transmit event to main manager to perform startup functions
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
    log.debug('ElectronRendererManager::createAppMenus called');
    ipcRenderer.send(CREATE_MENU, intl);
  }

  /**
   * Sets the DatabaseManager Instance
   * @param {Object} dbFile : database file returned by fileService
   */
  startDatabaseManager(dbFile) {
    log.debug('ElectronRendererService::startDatabaseManager called');
    DatabaseManager.file = dbFile;
    this.databaseManager = DatabaseManager.instance;
  }

  /**
   * Generates a new DB
   */
  generateDatabase() {
    log.debug('ElectronRendererService::generateDatabase called');
    this.startDatabaseManager();

    return new Promise(resolve => {
      this.databaseManager.generateTables().then(() => {
        resolve(true);
      });
    });
  }

  /**
   * Attempt to import database based on login credentials
   */
  loadDatabase() {
    log.debug('ElectronRendererManager::loadDatabase called');

    return new Promise(resolve => {
      ipcRenderer.once(FETCHED_DATABASE, (event, imported, buffer) => {
        if (imported) {
          log.debug('ElectronRendererManager::loadDatabase success');
          const dbBinary = new Uint8Array(buffer);

          this.startDatabaseManager(dbBinary);
          UpdateManager().then((updated) => {
            if (updated) {
              this.saveDatabase(this.username, this.password);
            }
          });
        } else {
          log.error('ElectronRendererManager::loadDatabase not found');
          ipcRenderer.send(DELETE_LOGS);
        }

        resolve(imported);
      });

      ipcRenderer.send(FETCH_DATABASE, this.username, this.password);
      ipcRenderer.send(DELETE_LOGS, log.transports.file.file);
    });
  }

  /**
   * Saves the current DB given the user information
   */
  saveDatabase() {
    log.debug('ElectronRendererManager::saveDatabase called');
    const dbBinary = this.databaseManager.exportDatabase();

    return new Promise(resolve => {
      ipcRenderer.once(SAVED_DATABASE, (event, saved) => {
        log.debug('ElectronRendererManager::saveDatabase database saved');

        resolve(saved);
      });

      ipcRenderer.send(SAVE_DATABASE, this.username, this.password, dbBinary);
    });
  }

  /**
   * Checks the database exists
   */
  checkDatabaseExists() {
    log.debug('ElectronRendererManager::checkDatabase called');

    return new Promise(resolve => {
      ipcRenderer.once(CHECKED_DATABASE, (event, exists) => {
        resolve(exists);
      });

      ipcRenderer.send(CHECK_DATABASE, this.username, this.password);
    });
  }
}
