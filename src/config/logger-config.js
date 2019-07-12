import path from 'path';
import getRuntimeFolder from './utils/get-runtime-folder';

export const APP_NAME = 'whitelabelwallet';
export const runtimeFolderPath = getRuntimeFolder(process.platform, process.env, APP_NAME);
export const appLogsFolderPath = path.join(runtimeFolderPath, 'Logs');
export const pubLogsFolderPath = path.join(appLogsFolderPath, 'pub');