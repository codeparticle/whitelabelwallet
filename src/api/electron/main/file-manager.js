import { app } from 'electron';
import fs from 'fs';
import os from 'os';
import log from 'electron-log';
import {
  CHECK_DATABASE,
  CHECKED_DATABASE,
  DELETE_LOGS,
  DELETE_LOGS_ERROR,
  DELETE_LOGS_SUCCESS,
  FETCH_DATABASE,
  FETCHED_DATABASE,
  PERFORM_STARTUP_SETUP,
  SAVE_DATABASE,
  SAVED_DATABASE,
  REMOVE_DATABASE,
  REMOVED_DATABASE,
} from '../ipc-events';
import { EncryptionManager } from '../../encryption-manager';

/**
 * Deals with all communication with user's local filesystem for the electron app
 */
export class FileManager {
  constructor(ipcMain) {
    ipcMain.on(PERFORM_STARTUP_SETUP, this.setUpFilePaths.bind(this));
    ipcMain.on(DELETE_LOGS, this.deleteLogs.bind(this));
    ipcMain.on(CHECK_DATABASE, this.checkDatabase.bind(this));
    ipcMain.on(FETCH_DATABASE, this.fetchDatabase.bind(this));
    ipcMain.on(SAVE_DATABASE, this.saveDatabase.bind(this));
    ipcMain.on(REMOVE_DATABASE, this.removeDatabase.bind(this));
  }

  checkDatabase(event, username, password) {
    this.fileExists(username, password).then((exists) => {
      event.sender.send(CHECKED_DATABASE, exists);
    });
  }

  fetchDatabase(event, username, password) {
    const buffer = this.importDatabaseFile(username, password);

    event.sender.send(FETCHED_DATABASE, !!buffer, buffer);
  }

  saveDatabase(event, username, password, db) {
    this.storeDatabaseFile(username, password, db);
    event.sender.send(SAVED_DATABASE, true);
  }

  removeDatabase(event, username, password) {
    this.removeDatabaseFile(username, password);
    event.sender.send(REMOVED_DATABASE);
  }

  deleteLogs(event, filePath) {
    const { sender } = event;

    try {
      fs.unlinkSync(filePath);
      log.info('DELETE_LOGS_SUCCESS');
      return sender.send(DELETE_LOGS_SUCCESS);
    } catch (error) {
      log.warn(`DELETE_LOGS_ERROR: ${error}`);
      return sender.send(DELETE_LOGS_ERROR, error);
    }
  }

  // makes sure file directories are created before any operations on DB
  setUpFilePaths() {
    const rootPath = this.getRootFilePath();

    if (!fs.existsSync(rootPath)) {
      fs.mkdirSync(rootPath);
    }

    const walletPath = this.getWalletPath();
    if (!fs.existsSync(walletPath)) {
      fs.mkdirSync(walletPath);
    }
  }

  // retrieve root directory of whitelabelwallet DB path
  getRootFilePath() {
    let rootPath = '';
    const platform = os.platform();

    // 'win32' = windows 'darwin' = osx
    if (platform === 'win32' || platform === 'darwin') {
      rootPath = `${app.getPath('appData')}/whitelabelwallet/`;
    } else if (platform === 'linux') {
      rootPath = `${app.getPath('home')}/.whitelabelwallet/`;
    } else {
      console.log('Unidentified OS.');
      app.exit(0);
    }

    return rootPath;
  }

  // retrieve wallet directory
  getWalletPath() {
    return this.getRootFilePath() + 'wallets/';
  }

  // retrieve full file name extended from wallets path
  getFullFileName(filename) {
    const encryptionString = EncryptionManager.getEncryptionString();
    const appendedFilename = `${encryptionString}${filename}`;
    const encryptedFilename = EncryptionManager.encryptString(appendedFilename);

    return this.getWalletPath() + encryptedFilename + '.awd';
  }

  // checks if the file given exists already
  fileExists(username, password) {
    return new Promise(resolve => {
      const filename = username + password;
      const fullFileName = this.getFullFileName(filename);

      // returns true if exact match of the filename found
      if (fs.existsSync(fullFileName)) {
        resolve(true);
      }

      // if db file is not found, must check to see if username string is in any DB keyname
      // it's possible to provide existing username with wrong password, and create a new account
      const walletPath = this.getWalletPath();
      let userNameExists = false;

      fs.readdir(walletPath, (err, files) => {
        if (files) {
          files.forEach((file) => {
            const hasUsername = file.indexOf(username) !== -1;

            if (hasUsername) {
              userNameExists = true;
            }
          });
        }

        resolve(userNameExists);
      });
    });
  }

  /**
   * Reconstruct the full filename of the dbFile then return the buffer
   * if the file exists, otherwise returns null
   * @param {string} username : login name of the user
   * @param {string} password : user's password to the account
   */
  importDatabaseFile(username, password) {
    const fullFileName = this.getFullFileName(username + password);

    if (fs.existsSync(fullFileName)) {
      const encryptedBuffer = fs.readFileSync(fullFileName, { encoding: 'utf8' });

      if (encryptedBuffer.length) {
        return EncryptionManager.decryptDatabase(username, password, encryptedBuffer);
      }
    }

    return null;
  }

  /**
   * Store the given DB file on user's filesystem
   * @param {string} username : login name of the user
   * @param {string} password : user's password to the account
   * @param {Uint8Array} dbFile : DB file to be encrypted as exported by Wallet Manager
   */
  storeDatabaseFile(username, password, dbFile) {
    const fullFileName = this.getFullFileName(username + password);
    const encryptedDatabase = EncryptionManager.encryptDatabase(username, password, dbFile);

    this.storeFile(fullFileName, encryptedDatabase);
  }

  /**
   * Removes the given DB file on user's fs
   * @param {string} username : login name of the user
   * @param {string} password : user's password
   */
  removeDatabaseFile(username, password) {
    const fullFileName = this.getFullFileName(username + password);
    fs.unlinkSync(fullFileName);

    return true;
  }

  // saves file to local filesystem of the user
  storeFile(filename, data) {
    fs.writeFileSync(filename, data, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}
