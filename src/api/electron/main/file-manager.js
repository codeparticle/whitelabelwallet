import { app } from 'electron';
import fs from 'fs';
import os from 'os';
import { EncryptionManager } from '../../encryption-manager';
import { environment } from 'lib/utils';

const { encryptionString } = environment;

/**
 * Deals with all communication with user's local filesystem for the electron app
 */
export class FileManager {
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
      const encryptedBuffer = fs.readFileSync(fullFileName);

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
