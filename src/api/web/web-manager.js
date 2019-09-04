// TODO: Update this manager and electron-render-manager
// to extend a shared interface
import { DatabaseManager, UpdateManager } from 'api/db';
import { RenderManager } from 'api/render-manager';
import { EncryptionManager } from 'api/encryption-manager';
import { FileManager } from './file-manager';

export class WebManager extends RenderManager {
  constructor() {
    super();
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
   */
  loadDatabase() {
    // retrive dbFile encrypted
    const dbFile = this.fileManager.getDatabaseFile(this.username, this.password);

    return new Promise((resolve) => {
      if (!dbFile) {
        return resolve(false);
      }

      const decodedBinary = EncryptionManager.prepToLoadDatabase(this.username, this.password, dbFile);
      const dbBinary = EncryptionManager.encodeBinary(decodedBinary);

      this.startDatabaseManager(dbBinary);
      UpdateManager().then((updated) => {
        if (updated) {
          this.saveDatabase(this.username, this.password);
        }

        resolve(true);
      });
    });
  }

  /**
   * Saves the current DB given the user information
   */
  saveDatabase() {
    return new Promise(resolve => {
      const dbBinary = this.databaseManager.exportDatabase();
      const serializedBinary = EncryptionManager.prepToSaveDatabase(this.username, this.password, dbBinary);
      this.fileManager.storeDatabaseFile(this.username, this.password, serializedBinary);
      resolve(true);
    });
  }

  /**
   * Checks the database exists
   */
  checkDatabaseExists() {
    const dbFile = this.fileManager.getDatabaseFile(this.username, this.password);

    return new Promise((resolve) => {
      if (dbFile) {
        return resolve(true);
      }

      // if db file is not found, must check to see if username string is in any DB keyname
      // it's possible to provide existing username with wrong password, and create a new account
      let userNameExists = false;

      Object.keys(this.storage).forEach((keyName) => {
        const hasUsername = keyName.indexOf(this.username) !== -1;

        if (hasUsername) {
          userNameExists = true;
        }
      });

      resolve(userNameExists);
    });
  }
}
