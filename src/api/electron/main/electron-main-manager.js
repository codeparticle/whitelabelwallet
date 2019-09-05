/**
 * Manager for electron main process (NodeJS available)
 */
import fs from 'fs';
import log from 'electron-log';
import { ipcMain } from 'electron';
import { FileManager } from './file-manager';
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

export const initializeElectronMainManager = () => {
  const fileManager = new FileManager();

  // Perform app startup
  ipcMain.on(PERFORM_STARTUP_SETUP, () => {
    fileManager.setUpFilePaths();
  });

  ipcMain.on(DELETE_LOGS, (event, filePath) => {
    const sender = event.sender;
    try {
      fs.unlinkSync(filePath);
      log.info('DELETE_LOGS_SUCCESS');
      return sender.send(DELETE_LOGS_SUCCESS);
    } catch (error) {
      log.warn('DELETE_LOGS_ERROR: ' + error);
      return sender.send(DELETE_LOGS_ERROR, error);
    }
  });

  // Checks if a db file exists
  ipcMain.on(CHECK_DATABASE, (event, username, password) => {
    // checks if file exists first before generating database
    fileManager.fileExists(username, password).then((exists) => {
      event.sender.send(CHECKED_DATABASE, exists);
    });
  });

  // Tries to fetch an existing database from the user's local system
  ipcMain.on(FETCH_DATABASE, (event, username, password) => {
    const buffer = fileManager.importDatabaseFile(username, password);

    if (buffer) {
      event.sender.send(FETCHED_DATABASE, true, buffer);
    } else {
      // if import fails notify the client side
      event.sender.send(FETCHED_DATABASE, false);
    }
  });

  // Saved the database to the user's local system
  ipcMain.on(SAVE_DATABASE, (event, username, password, db) => {
    fileManager.storeDatabaseFile(username, password, db);
    event.sender.send(SAVED_DATABASE, true);
  });

  ipcMain.on(REMOVE_DATABASE, (event, username, password) => {
    fileManager.removeDatabaseFile(username, password);
    event.sender.send(REMOVED_DATABASE);
  });
};
