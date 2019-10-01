'use strict';

if (process.env.NODE_ENV === 'development') {
  require('babel-register');
  require('electron-reload')(__dirname);
}

require('dotenv').config();

const { environment } = require('./src/lib/utils/environment');

// Fixes process.env COIN and MODE vars
environment.isMock = () => process.env.MODE === 'mock';
environment.coin = environment.isMock() ? 'mock' : process.env.COIN;

// Fixes process.env.PATH variable
require('fix-path')();
require('electron-debug')({ enabled: environment.allowDebug() });
require('./src/window/main');
