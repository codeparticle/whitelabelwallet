try {
  require('../../config/env');
} catch (err) {
  require('dotenv').config();
}

const jsonServer = require('json-server');
const path = require('path');
// const _ = require('lodash');

const { MOCK_SERVER_PORT } = process.env;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }

  next();
});

server.use(router);

// needed because json-sever does not allow filtering on deeply nested arrays
router.render = (req, res) => {
  if (req.method === 'GET') {
    let data = res.locals.data;

    if (req.url.includes('/tx?address=')) {
      const queryParam = req.url.split('=');
      const incomingTxs = data.filter((tx) => {
        return tx.vout.find(vout => vout.scriptPubKey.addresses.includes(`${queryParam[1]}`));
      });
      const outgoingTxs = data.filter((tx) => {
        return tx.vin.find(vin => vin.addr === `${queryParam[1]}`);
      });

      data = {
        incomingTxs,
        outgoingTxs,
      };
    }
    res.send({
      data,
    });
  }
};

server.listen(MOCK_SERVER_PORT, () => {
  console.log(`JSON Server is running on port ${MOCK_SERVER_PORT}`);
});
