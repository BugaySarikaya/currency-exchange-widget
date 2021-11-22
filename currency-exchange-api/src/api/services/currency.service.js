const axios = require('axios');
const config = require('../../config/config');
const { server } = require('../server');
const cache = server.cache;

const exchangeCurrency = async (req) => {
  return new Promise((resolve, reject) => {
    const baseAmount = Number(req.query.baseAmount);

    // Get cached value
    const cacheKey = `${req.query.baseCurrency}-${req.query.quoteCurrency}`;
    const cachedRate = cache.get(cacheKey);

    let exchangeAmount, exchangeData;

    // Check cache values
    if (cachedRate) {
      exchangeAmount = Math.round(baseAmount * cachedRate); // Calculate new amount

      exchangeData = {
        quoteRate: cachedRate,
        exchangeAmount,
      };
      resolve(exchangeData);
    } else {
      const url = `https://v6.exchangerate-api.com/v6/${config.exchangeRateApiKey}/latest/${req.query.baseCurrency}`;

      // Send a request for get current rate values to exchange rate api
      axios
        .get(url)
        .then((result) => {
          // Check the rates
          if (result.data.conversion_rates) {
            let quoteRate =
              result.data.conversion_rates[req.query.quoteCurrency];
            if (quoteRate) {
              exchangeAmount = Math.round(baseAmount * quoteRate); // Calculate new amount

              exchangeData = {
                quoteRate,
                exchangeAmount,
              };

              cache.set(cacheKey, quoteRate); // Cache base-quote currency types with quote rate
              resolve(exchangeData);
            } else {
              reject({ msg: 'Quote rate not found.', status: 404 });
            }
          } else {
            reject({ msg: 'Rate not found.', status: 404 });
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

module.exports.currencyService = {
  exchangeCurrency,
};
