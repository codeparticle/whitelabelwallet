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

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();

    console.log('========\n', 'req.body', req.body, '\n========');
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

    db.unspentTxOuts = req.body; // validate uTxOs arraay
    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 4), (err) => {
      if (err) {
        throw err;
      }

      res.send('uTxOs updated');
    });
  });
});

// server.post('/createWallet', (req, res) => {
//   res.send('wallet created');
// });


server.use(router);

server.listen(MOCK_SERVER_PORT, () => {
  console.log(`JSON Server is running on port ${MOCK_SERVER_PORT}`);
});
