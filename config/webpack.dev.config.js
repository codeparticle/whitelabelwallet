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
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const getClientEnvironment = require('./env');
const baseConfig = require('./webpack.base.config');
const paths = require('./paths');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = `http://127.0.0.1:${process.env.PORT || 8080}/`;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

const devConfig = {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    `webpack-dev-server/client?${publicPath}`,
    'webpack/hot/only-dev-server',
    paths.appIndexJs,
  ],
  output: {
    path: paths.appBuild,
    filename: 'bundle.js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(fs-extra|rss-parser|universalify|proxy-polyfill)\/).*/,
        use: [
          'react-hot-loader/webpack',
          'babel-loader',
        ],
      },
    ],
  },
  plugins: [
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({
      context: paths.appSrc,
      emitErrors: false,
      failOnError: false,
      files: '**/*.scss',
      quiet: false,
      syntax: 'scss',
    }),
  ],
  devServer: {
    hot: true,
    host: '127.0.0.1',
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: paths.templatesDev,
    port: process.env.PORT || 8080,
    historyApiFallback: true,
  },
  mode: 'development',
  node: {
    child_process: 'empty',
    fs: 'empty',
    path: 'empty',
  },
};

module.exports = merge.smart(baseConfig, devConfig);
