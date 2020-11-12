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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.otf', '.json'],
    modules: [paths.appSrc, 'node_modules'],
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
      'application-config': paths.applicationConfig,
    },
  },
  module: {
    rules: [
      // Take all sass files, compile them, and bundle them in with our js bundle
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-scss',
              plugins: [
                require('autoprefixer')(),
                require('postcss-preset-env')(),
                require('cssnano')(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules'],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|otf|woff|woff2|webm|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
            },
          },
        ],
      },
      {
        test: /icon\.ico$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
};
