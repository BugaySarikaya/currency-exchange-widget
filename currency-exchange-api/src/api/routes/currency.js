const express = require('express');
const { validate } = require('express-validation');

const currencyValidation = require('../../validations/currency.validation');
const currencyController = require('../controller/currency.controller');

// api/currency
const currencyRouter = () => {
  const router = express.Router();

  router.get(
    '',
    validate(currencyValidation.get), //validate request with currency scheme
    currencyController.getCurrency
  );
  return router;
};

module.exports = currencyRouter;
