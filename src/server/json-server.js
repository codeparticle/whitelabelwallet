try {
  require('../../config/env');
} catch (err) {
  require('dotenv').config();
}

const jsonServer = require('json-server');
const path = require('path');

const { MOCK_SERVER_PORT } = process.env;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {

    console.log('========\n', 'req.body', req.body, '\n========');
    req.body.createdAt = Date.now();
  }

  next();
});

server.use(router);

server.listen(MOCK_SERVER_PORT, () => {
  console.log(`JSON Server is running on port ${MOCK_SERVER_PORT}`);
});
