import os from 'os';

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
  contributors: packageInfo.contributors,
  current: process.env.NODE_ENV,
  homepage: packageInfo.homepage,
  isDev: () => environment.current === 'development',
  isElectron: () => process.env.TYPE === 'electron',
  isProduction: () => environment.current === 'production' || !environment.isDev(),
  isLinux: () => os.platform() === 'linux',
  isOSX: () => os.platform() === 'darwin',
  isWindows: () => os.platform() === 'win32',
  license: packageInfo.license,
  platform,
  productName: packageInfo.productName,
  version: packageInfo.version,
};

export { environment };
