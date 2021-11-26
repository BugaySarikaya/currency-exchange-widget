const { server } = require('../src/api/server');
const supertest = require('supertest');
const PORT = 5000;

describe('The currency get endpoint test', () => {
  let app;
  let request;

  beforeAll(async () => {
    app = await server.createServer();
    await app.listen(PORT);
    request = supertest(app);
  });

  it('Should return 200', async () => {
    const res = await request
      .get('/api/currency?baseCurrency=USD&quoteCurrency=EUR&baseAmount=12')
      .set('Content-Type', 'application/json')
      .set('Accept', /json/);

    expect(res.status).toBe(200);
  });

  it('Should return quoteRare and exchangeAmount variables', async () => {
    const res = await request
      .get('/api/currency?baseCurrency=USD&quoteCurrency=EUR&baseAmount=12')
      .set('Content-Type', 'application/json')
      .set('Accept', /json/);

    expect(res.body).toHaveProperty('quoteRate');
    expect(res.body).toHaveProperty('exchangeAmount');
    expect(res.body.quoteRate).toBeTruthy();
    expect(res.body.exchangeAmount).toBeTruthy();
  });
});
