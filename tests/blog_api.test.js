const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'First test of blog in test database',
    author: 'Fred Durham',
    url: 'http://www.launchschool.com',
    likes: 15,
  },
  {
    title: 'Second test of blog in test database',
    author: 'Fred Durham',
    url: 'http://www.launchschool.com',
    likes: 12,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((blog) => blog.title);
  expect(titles).toContain(initialBlogs[1].title);
});

afterAll(async () => {
  await mongoose.connection.close();
});
