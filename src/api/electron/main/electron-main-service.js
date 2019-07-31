/**
 * Service for electron main process (NodeJS available)
 */
import fs from 'fs';
import log from 'electron-log';
import { ipcMain } from 'electron';
import { FileService } from './file-service';
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
} from '../ipc-events';

export const initializeElectronMainService = () => {
  const fileService = new FileService();

  // Perform app startup
  ipcMain.on(PERFORM_STARTUP_SETUP, () => {
    fileService.setUpFilePaths();
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
    fileService.fileExists(username, password).then((exists) => {
      event.sender.send(CHECKED_DATABASE, exists);
    });
  });

  // Tries to fetch an existing database from the user's local system
  ipcMain.on(FETCH_DATABASE, (event, username, password) => {
    const buffer = fileService.importDatabaseFile(username, password);

    if (buffer) {
      event.sender.send(FETCHED_DATABASE, true, buffer);
    } else {
      // if import fails notify the client side
      event.sender.send(FETCHED_DATABASE, false);
    }
  });

  // Saved the database to the user's local system
  ipcMain.on(SAVE_DATABASE, (event, username, password, db) => {
    fileService.storeDatabaseFile(username, password, db);
    event.sender.send(SAVED_DATABASE, true);
  });
};
