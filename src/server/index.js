try {
  require('../../config/env');
} catch (err) {
  require('dotenv').config();
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const {
  API_URL,
  EXPRESS_PORT,
  ORIGIN_URL,
  PORT: APP_PORT,
  RUN_PROD_SERVER,
} = process.env;

const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');

const app = express();
const PORT = EXPRESS_PORT || 8081;

const buildDirectory = path.resolve(__dirname, '../../build');

app.use(express.static(buildDirectory));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${ORIGIN_URL}:${APP_PORT}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/api/*', proxy(API_URL, {
  proxyReqPathResolver: req => req.baseUrl.replace('/api', ''),
}));

app.get('/ping', (req, res) => res.end('OK'));

if (RUN_PROD_SERVER) {
  app.get('/^(?!\\/api).+/*', (req, res) => {
    res.sendFile(`${buildDirectory}/index.html`);
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening on port ${PORT}`);
});
