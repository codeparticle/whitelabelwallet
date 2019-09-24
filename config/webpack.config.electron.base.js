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
