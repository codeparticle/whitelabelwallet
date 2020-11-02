/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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

  reset() {
    log.debug('ElectronRendererService::resetManager called');
    DatabaseManager.reset();
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
