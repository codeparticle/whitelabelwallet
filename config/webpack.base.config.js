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
