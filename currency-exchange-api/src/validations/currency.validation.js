'use strict';

const { Joi } = require('express-validation');
const currencyType = require('../api/models/currency-type.model');

module.exports = {
  get: {
    query: Joi.object({
      baseCurrency: Joi.string()
        .trim()
        .min(3)
        .max(3)
        .valid(...currencyType) // Currency type checking for ['USD', 'EUR', 'GBP', 'ILS']
        .required(),
      quoteCurrency: Joi.string()
        .trim()
        .min(3)
        .max(3)
        .valid(...currencyType)
        .required(),
      baseAmount: Joi.number().integer().required(),
    }),
  },
};
