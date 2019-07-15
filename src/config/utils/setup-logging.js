import path from 'path';
import log from 'electron-log';
import moment from 'moment';
import directoryCheck from './directory-check';
import { pubLogsFolderPath, APP_NAME } from '../logger-config';

export const setupLogging = () => {
  const logFilePath = path.join(pubLogsFolderPath, APP_NAME + '.log');
  directoryCheck(pubLogsFolderPath);

  log.transports.file.appName = 'whitelabelwallet';
  log.transports.file.file = logFilePath;
  // assign levels
  log.transports.console.level = 'error';
  log.transports.rendererConsole.level = 'error';
  log.transports.file.level = 'debug';
  log.transports.file.maxSize = 20 * 1024 * 1024;
  // would write to the file with flags: 'w', currently appends to it
  log.transports.file.streamConfig = { flags: 'a' };

  log.transports.file.format = (msg) => {
    const formattedDate = moment(msg.date).format('YYYY-MM-DDTHH:mm:ss.0SSS');
    return `[${formattedDate}Z] [${msg.level}] ${msg.data}`;
  };
};