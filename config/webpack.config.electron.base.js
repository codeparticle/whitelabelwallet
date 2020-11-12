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
/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import { dependencies as possibleExternals } from '../package.json';
const paths = require('./paths');

// Find all the dependencies without a `main` property and add them as webpack externals
function filterDepWithoutEntryPoints(dep) {
  // Return true if we want to add a dependency to externals
  try {
    // If the root of the dependency has an index.js, return true
    if (fs.existsSync(path.join(paths.appNodeModules, `${dep}/index.js`))) {
      return false;
    }
    const pgkString = fs
      .readFileSync(path.join(paths.appNodeModules, `${dep}/package.json`))
      .toString();
    const pkg = JSON.parse(pgkString);
    const fields = ['main', 'module', 'jsnext:main', 'browser'];
    return !fields.some(field => field in pkg);
  } catch (e) {
    console.log(e);
    return true;
  }
}

export default {
  externals: [
    ...Object.keys(possibleExternals || {}).filter(filterDepWithoutEntryPoints),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.otf', '.json'],
    modules: [paths.appSrc, paths.e2e, 'node_modules'],
    alias: {
      'api': paths.appApi,
      'app': paths.appApp,
      'coins': paths.coins,
      'components': paths.appComponents,
      'config': paths.appConfig,
      'global-components': paths.appGlobalComponents,
      'lib': paths.appLib,
      'pages': paths.appPages,
      'rdx': paths.appRdx,
      'server': paths.appServer,
      'translations': paths.appTranslations,
      'window': paths.appWindow,
      'e2e': paths.e2e,
      'package.json': paths.appApi,
      'plugins': paths.plugins,
      'application-config': paths.applicationConfig,
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(fs-extra|rss-parser|universalify|proxy-polyfill)\/).*/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'app'),
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
