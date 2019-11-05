/**
 * @fileoverview RenderManager class serving as an interface for web and electron
 * @author Gabriel Womble
 */
import { DatabaseManager } from 'api/db';
import { TransactionManager } from './transaction-manager';
import { WalletManager } from './wallet-manager';
import { empty } from 'lib/utils';
import { environment } from 'lib/utils/environment';
import { GENERAL } from 'lib/constants';

const { POLL_INTERVAL } = GENERAL;

let log = {};
const { isElectron } = environment;
const required = (methodName) => {
  throw new Error(`${methodName} undefined.`);
};

if (isElectron()) {
  const { remote } = window.require('electron');
  log = remote.require('electron-log');
} else {
  log.debug = empty;
}

export class RenderManager {
  /**
   * Sets the manager user
   * @param {string} username
   * @param {string} password
   */
  setUser(username, password) {
    log.debug('ElectronRendererService::setUser called');

    this.username = username;
    this.password = password;

    return this;
  }

  initializePolling(callback, pollOnStart) {
    if (pollOnStart) {
      callback();
    }

    setInterval(callback, POLL_INTERVAL);
  }

  /**
   * Sets multiple manager properties such as databaseManager and walletManager and begins polling
   * @param {Object} dbFile : database file returned by fileManager
   */
  initializeManagers(manager, dbFile = null) {
    log.debug('ElectronRendererService::initializeManagers called');
    DatabaseManager.file = dbFile;
    manager.databaseManager = DatabaseManager.instance;
    manager.walletManager = new WalletManager(manager);
    manager.transactionManager = new TransactionManager(manager);

    this.initializePolling(() => {
      manager.walletManager.pollAddressData();
    }, Boolean(dbFile));
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

  /**
   * Updates the database name
   */
  updateDatabaseName() {
    required('updateDatabaseName');
  }
}
