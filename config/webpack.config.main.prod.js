/**
 * Webpack config for production electron main process
 */

import webpack from 'webpack';
import merge from 'webpack-merge';

import baseConfig from './webpack.config.electron.base';
import checkNodeEnv from '../ci/internal/check-node-env';

checkNodeEnv('production');

export default merge.smart(baseConfig, {
  mode: 'production',
  target: 'electron-main',
  entry: './main.js',

  output: {
    path: __dirname,
    filename: '../dist/main.js',
  },

  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        loader: 'ignore-loader',
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },
});
