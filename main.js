'use strict';

if (process.env.NODE_ENV === 'development') {
  require('babel-register');
  require('electron-reload')(__dirname);
}

require('dotenv').config();

const { environment } = require('./src/lib/utils/environment');

// Fixes process.env.PATH variable
require('fix-path')();
require('electron-debug')({ enabled: environment.allowDebug() });
require('./src/window/main');
