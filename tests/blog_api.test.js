const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2);
});

test('first blog is "First test of blog in test database"', async () => {
  const response = await api.get('/api/blogs');
  // console.log(response.body);
  expect(response.body[0].title).toBe('First test of blog in test database');
});

afterAll(async () => {
  await mongoose.connection.close();
});
