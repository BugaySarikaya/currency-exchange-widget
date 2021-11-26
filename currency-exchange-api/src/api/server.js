'use strict';

const LRUCache = require('../helpers/lru-cache');
const options = {
  capacity: 4, // The maximum size of the cache, checked by applying the length function to all values in the cache.
  timeout: 8000, // timeout ms, 8000 to detect rate changes
};

// Defined here. Because it should work for an entire application.
const cache = new LRUCache(options);

const createServer = async () => {
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');

  const routes = require('./routes');
  const { ValidationError } = require('express-validation');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use('/api', routes());

  app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
  });

  return app;
};

module.exports.server = {
  createServer,
  cache,
};
