'use strict';

const LRU = require('lru-cache');
const options = {
  max: 4, // The maximum size of the cache, checked by applying the length function to all values in the cache.
  maxAge: 5000, // Maximum age in ms, 5000 to detect rate changes
};

// Defined here. Because it should work for an entire application.
const cache = new LRU(options);

const createServer = async () => {
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');

  const routes = require('./routes');
  const { ValidationError } = require('express-validation');

  const PORT = 3000;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use('/api', routes());

  app.use((err, req, res) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
  });

  app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('Server listening: ', 'http://localhost:' + PORT + '/api');
  });
};

module.exports.server = {
  createServer,
  cache,
};
