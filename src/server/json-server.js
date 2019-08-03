try {
  require('../../config/env');
} catch (err) {
  require('dotenv').config();
}

const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const { MOCK_SERVER_PORT } = process.env;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.ORIGIN_URL}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }

  next();
});

// custom routes needed to do a replace on subset of db, JSON server does not have this functionality out of the box.
server.post('/unspentTxOuts', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), (err, data) => {
    if (err) {
      throw err;
    }
    const db = JSON.parse(data);
    const addIds = req.body.map((uTxO, index) => {
      return {
        ...uTxO,
        id: index + 1,
      };
    });

    db.unspentTxOuts = addIds; // validate uTxOs arraay
    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2), (err) => {
      if (err) {
        throw err;
      }
      res.send('uTxOs updated');
    });
  });
});


server.use(router);

server.listen(MOCK_SERVER_PORT, () => {
  console.log(`JSON Server is running on port ${MOCK_SERVER_PORT}`);
});
