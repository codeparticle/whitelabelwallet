'use strict';

// this file defines all relevant paths to be used in webpack configs

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = () => envPublicUrl || './';

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  electronBuild: resolveApp('dist'),
  devHtml: resolveApp('templates/dev/index.html'),
  templatesDev: resolveApp('templates/dev'),
  templatesProd: resolveApp('templates/prod'),
  electronHtml: resolveApp('templates/dev/index-electron.html'),
  prodHtml: resolveApp('templates/prod/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  appApi: resolveApp('src/api'),
  appApp: resolveApp('src/app'),
  appComponents: resolveApp('src/components'),
  appConfig: resolveApp('src/config'),
  appGlobalComponents: resolveApp('src/global-components'),
  appLib: resolveApp('src/lib'),
  appPages: resolveApp('src/pages'),
  appRdx: resolveApp('src/rdx'),
  appServer: resolveApp('src/server'),
  appTranslations: resolveApp('src/translations'),
  appWindow: resolveApp('src/window'),
  e2e: resolveApp('tests/e2e'),
  plugins: resolveApp('plugins'),
  applicationConfig: resolveApp('application-config'),
  delimiter: path.delimiter,
};
