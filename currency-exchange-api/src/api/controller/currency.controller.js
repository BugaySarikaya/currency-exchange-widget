const { currencyService } = require('../services/currency.service');

module.exports = {
  getCurrency: async (req, res, next) => {
    try {
      const currencyResult = await currencyService.exchangeCurrency(req);
      res.status(200).send(currencyResult);
    } catch (err) {
      res.status(err.status || 400).send(err.msg);
    }
  },
};
