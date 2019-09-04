/**
 * @fileoverview RenderManager class serving as an interface for web and electron
 * @author Gabriel Womble
 */
import { environment } from 'lib/utils/environment';

let log;
const { isElectron } = environment;
const required = (methodName) => {
  throw new Error(`${methodName} undefined.`);
};

if (isElectron()) {
  const { remote } = window.require('electron');
  log = remote.require('electron-log');
}

export class RenderManager {
  /**
   * Sets the manager user
   * @param {string} username
   * @param {string} password
   */
  setUser(username, password) {
    if (isElectron()) {
      log.debug('ElectronRendererService::startDatabaseManager called');
    }

    this.username = username;
    this.password = password;

    return this;
  }

  /**
   * Sets the DatabaseManager Instance
   * @param {Object} dbFile : database file returned by fileManager
   */
  startDatabaseManager() {
    required('startDatabaseManager');
  }

  /**
   * Generates a new DB
   */
  generateDatabase() {
    required('generateDatabase');
  }

  /**
   * Attempt to import database based on login credentials
   */
  loadDatabase() {
    required('loadDatabase');
  }

  /**
   * Saves the current DB given the user information
   */
  saveDatabase() {
    required('saveDatabase');
  };

  /**
   * Checks the database exists
   */
  checkDatabaseExists() {
    required('checkDatabaseExists');
  }

}
