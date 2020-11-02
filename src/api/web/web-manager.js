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
import { UpdateManager } from 'api/db';
import { RenderManager } from 'api/render-manager';
import { EncryptionManager } from 'api/encryption-manager';
import { FileManager } from './file-manager';

export class WebManager extends RenderManager {
  constructor() {
    super();
    this.storage = window.localStorage;
    this.fileManager = new FileManager(this.storage);
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new WebManager();
    }
    return this._instance;
  }

  static resetInstance() {
    this._instance = null;
  }

  /**
   * Generates a new DB
   */
  generateDatabase() {
    this.initializeManagers(this);

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
    // retrive dbFile encrypted
    const dbFile = this.fileManager.getDatabaseFile(this.username, this.password);

    return new Promise((resolve) => {
      if (!dbFile) {
        return resolve(false);
      }

      const dbBinary = EncryptionManager.decryptDatabase(this.username, this.password, dbFile);

      this.initializeManagers(this, dbBinary);
      UpdateManager().then((updated) => {
        if (updated) {
          this.saveDatabase(this.username, this.password);
        }

        resolve(true);
      });
    });
  }

  /**
   * Creates a renamed copy of the current DBfile, and deletes the old one.
   * Both parameters default to the respective current user value incase one
   * or the other is a null value. This is useful when a user wishes to rename
   * the account username, but keep the same password. It also works for the inverse
   * scenario.
   * @param {string} username - desired username
   * @param {string} password - desired password
   */
  updateDatabaseName(username, password) {
    username = username || this.username;
    password = password || this.password;

    this.checkDatabaseExists(username, password).then((exists) => {
      if (exists) {
        return false;
      }

      this.saveDatabase(username, password).then(() => {
        this.fileManager.removeDatabaseFile(this.username, this.password);
        this.setUser(username, password);
      });

      return true;
    });
  }

  /**
   * Saves the current DB given the user information
   * Params should only be specified when used via updateDatabaseName
   * @param {string} username
   * @param {string} password
   */
  saveDatabase(username, password) {
    username = username || this.username;
    password = password || this.password;

    return new Promise(resolve => {
      const dbBinary = this.databaseManager.exportDatabase();
      const serializedBinary = EncryptionManager.encryptDatabase(username, password, dbBinary);
      this.fileManager.storeDatabaseFile(username, password, serializedBinary);
      resolve(true);
    });
  }

  /**
   * Checks the database exists
   * Params should only be specified when used via updateDatabaseName
   * @param {string} username
   * @param {string} password
   */
  checkDatabaseExists(username, password) {
    username = username || this.username;
    password = password || this.password;

    const dbFile = this.fileManager.getDatabaseFile(username, password);

    return new Promise((resolve) => {
      if (dbFile) {
        return resolve(true);
      }

      // if db file is not found, must check to see if username string is in any DB keyname
      // it's possible to provide existing username with wrong password, and create a new account
      let userNameExists = false;

      Object.keys(this.storage).forEach((keyName) => {
        const hasUsername = keyName.indexOf(username) !== -1;

        if (hasUsername) {
          userNameExists = true;
        }
      });

      resolve(userNameExists);
    });
  }
}
