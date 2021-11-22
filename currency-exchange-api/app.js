'use strict';

const { server } = require('./src/api/server');

// starts application
const start = async () => {
  await server.createServer();
};

start();
