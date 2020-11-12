/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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