const app = require('../../server/server');
const supertest = require("supertest");
const request = supertest(app);


// test route endpoint
app.get('/test', async (req, res) => {
  res.json({message: 'pass!'})
})

// setting up the test
it('Gets the test endpoint', async done => {
  const response = await request.get('/test')
  expect(response.status).toBe(200)
  expect(response.body.message).toBe('pass!')
  done();
})