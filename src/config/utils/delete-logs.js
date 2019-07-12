import { ipcMain } from 'electron';
import fs from 'fs';
import log from 'electron-log';

// TODO set up deleting logs
export default () => {
  // Can be used to send 'delete-logs' with path to log files to delete them
  ipcMain.on('delete-logs', (event, filePath) => {
    const sender = event.sender;
    try {
      fs.unlinkSync(filePath);
      log.info('DELETE_LOGS_SUCCESS');
      return sender.send('delete-logs-success');
    } catch (error) {
      log.warn('DELETE_LOGS_ERROR: ' + error);
      return sender.send('delete-logs-error', error);
    }
  });
};