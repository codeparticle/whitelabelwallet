import { EncryptionService } from '../encryption-service';
import { FileService } from './file-service';

export class WebService {
  constructor() {
    this.storage = window.localStorage;
    this.fileService = new FileService(this.storage);
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

      resolve(dbBinary);
    });
  }

  /**
   * Saves the current DB given the user information
   * @param {string} username : username fetched from login page
   * @param {string} password : password passed in by user
   */
  saveDatabase(username, password, dbBinary) {
    return new Promise(resolve => {
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
