const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const getClientEnvironment = require('./env');
const baseConfig = require('./webpack.base.config');
const paths = require('./paths');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

const prodConfig = {
  // devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    paths.appIndexJs,
  ],
  output: {
    path: paths.appBuild,
    filename: 'bundle.[hash].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(fs-extra|rss-parser|universalify|proxy-polyfill)\/).*/,
        use: [
          'obfuscator-loader',
          'uglify-loader',
          'babel-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: paths.prodHtml,
      inject: true,
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

    new CleanWebpackPlugin(),

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
  mode: 'production',
  node: {
    child_process: 'empty',
    fs: 'empty',
    path: 'empty',
  },
};

module.exports = merge.smart(baseConfig, prodConfig);
