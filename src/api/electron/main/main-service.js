/**
 * Service for electron main process (NodeJS available)
 */
import { ipcMain } from 'electron';

export default () => {
  // Perform app startup
  ipcMain.on('perform-startup-setup', () => {
    console.log('App startup performed');
  });
};
