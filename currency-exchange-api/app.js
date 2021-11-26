'use strict';

const { server } = require('./src/api/server');

// starts application
const start = async () => {
  const app = await server.createServer();
  const PORT = 3000;

  app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('Server listening: ', 'http://localhost:' + PORT + '/api');
  });
};

start();
