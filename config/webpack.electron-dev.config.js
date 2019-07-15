const merge = require('webpack-merge');
const devConfig = require('./webpack.dev.config');

const electronDevConfig = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|otf|woff|woff2|webm|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: `http://127.0.0.1:${process.env.PORT || 8080}`,
            },
          },
        ],
      },
    ],
  },
  externals: {
    child_process: "require('child_process')",
    crypto: "require('crypto')",
    fs: "require('fs')",
    os: "require('os')",
    path: "require('path')",
    tls: "require('tls')",
    net: "require('net')",
  },
};

module.exports = merge.smart(devConfig, electronDevConfig);
