const dotenv = require('dotenv')
const express = require('express');
const bodyParser = require('body-parser');
const runNetwork = require('./lib/runNetwork.cjs');

dotenv.config()

const PORT = process.env.BACK_PORT || 3000

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack
  })
  next();
})

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.get('/', (req, res) => {
  res.json({
    message: "Hello!"
  })
})

app.get('/black-jack-network', (req, res) => {
  const params = req.query;

  try {
    const network = runNetwork(params.sum, params.openedCard);

    res.json(network);

  } catch (error) {
    console.log(error);

    return res.status(400).send({
      status: 400,
      reason: 'BAD_REQUEST',
      message: error.message,
    });
  }
})

app.listen(PORT, () => console.log('Server is up on host: ' + process.env.BACK_HOST + ' on port: ' + PORT))