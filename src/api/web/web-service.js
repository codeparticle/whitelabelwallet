import { SqlService, UpdateService } from '../db';
import { EncryptionService } from '../encryption-service';
import { FileService } from './file-service';

export class WebService {
  constructor() {
    this.storage = window.localStorage;
    this.fileService = new FileService(this.storage);
  }

  /**
   * Sets the SqlService Instance
   * @param {Object} dbFile : database file returned by fileService
   */
  startSqlService(dbFile) {
    SqlService.file = dbFile;
    this.sqlService = SqlService.instance;
  }

  /**
   * Generates a new DB
   */
  generateDatabase() {
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
    // retrive dbFile encrypted
    const dbFile = this.fileService.getDatabaseFile(username, password);

    return new Promise((resolve) => {
      if (!dbFile) {
        return resolve(false);
      }

      const decodedBinary = EncryptionService.prepToLoadDatabase(username, password, dbFile);
      const dbBinary = EncryptionService.encodeBinary(decodedBinary);

      this.startSqlService(dbBinary);
      UpdateService().then((updated) => {
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
      const dbBinary = this.sqlService.exportDatabase();
      const serializedBinary = EncryptionService.prepToSaveDatabase(username, password, dbBinary);
      this.fileService.storeDatabaseFile(username, password, serializedBinary);
      resolve(true);
    });
  }

  /**
   * Checks the database exists
   * @param {string} username : username fetched from login page
   * @param {string} password : password passed in by user
   */
  checkDatabaseExists(username, password) {
    const dbFile = this.fileService.getDatabaseFile(username, password);

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
