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
 * Build config for electron renderer process
 */

// TODO: Add Uglificationo (Needs to code split sql.js because it throws an error when uglified)

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.electron.base';
import checkNodeEnv from '../ci/internal/check-node-env';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

checkNodeEnv('production');

export default merge.smart(baseConfig, {
  mode: 'production',

  target: 'electron-renderer',

  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    paths.appIndexJs,
  ],

  output: {
    path: paths.electronBuild,
    publicPath,
    filename: 'renderer.prod.js',
  },

  module: {
    rules: [
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
              pubicPath: '../',
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
  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
    }),
    new HtmlWebpackPlugin({
      filename: path.join(paths.electronBuild, 'index.html'),
      template: paths.prodHtml,
      inject: false,
      chunksSortMode: 'none',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

    new webpack.DefinePlugin(env.stringified),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!main.js'],
    }),

    new OptimizeCssnanoPlugin({
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
  ],
  optimization: {
    minimize: false,
  },
});
