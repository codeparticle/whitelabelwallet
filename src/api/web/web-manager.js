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
      const serializedBinary = EncryptionManager.prepToSaveDatabase(username, password, dbBinary);
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
