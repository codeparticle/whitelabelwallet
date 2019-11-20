import os from 'os';
import  { API_KEY_NOT_SET } from './constants';

const platform = os.platform();
let packageInfo;

if (platform === 'darwin' || platform === 'win32' || platform === 'linux' || platform === 'browser') {
  try {
    packageInfo = require('package.json');
  } catch (e) {
    console.log(e.message);
  }
} else {
  try {
    packageInfo = require('../../../package.json');
  } catch (e) {
    console.log(e.message);
  }
}

const environment = {
  allowDebug: () => process.env.ALLOW_DEBUG === true || environment.isDev(),
  coin: process.env.COIN,
  coinApiKey: process.env.COIN_API_KEY === API_KEY_NOT_SET ? null : process.env.COIN_API_KEY,
  contributors: packageInfo.contributors,
  current: process.env.NODE_ENV,
  encryptionString: () => environment.isMock() ? 'mock' : 'whitelabelwallet',
  fiat: process.env.FIAT,
  homepage: packageInfo.homepage,
  isDev: () => environment.current === 'development',
  isElectron: () => process.env.TYPE === 'electron',
  isProduction: () => environment.current === 'production' || !environment.isDev(),
  isLinux: () => os.platform() === 'linux',
  isMock: () => process.env.MODE === 'mock',
  isOSX: () => os.platform() === 'darwin',
  isWindows: () => os.platform() === 'win32',
  license: packageInfo.license,
  platform,
  productName: packageInfo.productName,
  secret: process.env.REACT_APP_SECRET,
  stringEncryptionSecret: process.env.REACT_APP_STRING_ENCRYPTION_PASSWORD,
  version: packageInfo.version,
};

export { environment };
