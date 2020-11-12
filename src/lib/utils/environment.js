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
