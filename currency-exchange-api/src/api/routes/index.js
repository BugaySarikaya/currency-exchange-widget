'use strict';

const express = require('express');
const currency = require('./currency');

const apiRouter = () => {
  const routes = express.Router();
  const currencyRouter = currency();

  routes.use('/currency', currencyRouter);
  return routes;
};

module.exports = apiRouter;
