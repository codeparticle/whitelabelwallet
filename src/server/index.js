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
  res.setHeader('Access-Control-Allow-Origin', `${ORIGIN_URL}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/api/*', proxy(API_URL, {
  proxyReqPathResolver: req => {
    const queryParams = req.url.split('?')[1] || '';

    return `${req.baseUrl.replace('/api', '')}${queryParams ? `?${queryParams}` : ''}`;
  },
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
