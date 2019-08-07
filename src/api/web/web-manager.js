import { DatabaseManager, UpdateManager } from '../db';
import { EncryptionManager } from '../encryption-manager';
import { FileManager } from './file-manager';

export class WebManager {
  constructor() {
    this.storage = window.localStorage;
    this.fileManager = new FileManager(this.storage);
  }

  /**
   * Sets the DatabaseManager Instance
   * @param {Object} dbFile : database file returned by fileManager
   */
  startDatabaseManager(dbFile) {
    DatabaseManager.file = dbFile;
    this.databaseManager = DatabaseManager.instance;
  }

  /**
   * Generates a new DB
   */
  generateDatabase() {
    this.startDatabaseManager();

    return new Promise(resolve => {
      this.databaseManager.generateTables().then(() => {
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
    // retrive dbFile encrypted
    const dbFile = this.fileManager.getDatabaseFile(username, password);

    return new Promise((resolve) => {
      if (!dbFile) {
        return resolve(false);
      }

      const decodedBinary = EncryptionManager.prepToLoadDatabase(username, password, dbFile);
      const dbBinary = EncryptionManager.encodeBinary(decodedBinary);

      this.startDatabaseManager(dbBinary);
      UpdateManager().then((updated) => {
        if (updated) {
          this.saveDatabase(username, password);
        }

        resolve(true);
      });
    });
  }

  /**
   * Saves the current DB given the user information
   * @param {string} username : username fetched from login page
   * @param {string} password : password passed in by user
   */
  saveDatabase(username, password) {
    return new Promise(resolve => {
      const dbBinary = this.databaseManager.exportDatabase();
      const serializedBinary = EncryptionManager.prepToSaveDatabase(username, password, dbBinary);
      this.fileManager.storeDatabaseFile(username, password, serializedBinary);
      resolve(true);
    });
  }

  /**
   * Checks the database exists
   * @param {string} username : username fetched from login page
   * @param {string} password : password passed in by user
   */
  checkDatabaseExists(username, password) {
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
