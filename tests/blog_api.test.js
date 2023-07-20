const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helpers');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((blog) => blog.title);
  expect(titles).toContain(helper.initialBlogs[1].title);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'a Brand New Blog',
    author: 'John Jamison',
    url: 'http://www.launchschool.com',
    likes: 100,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map((blog) => blog.title);

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain(newBlog.title);
});

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'John Jamison',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog can be viwed', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = await blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultBlog.body).toEqual(blogToView);
});

test('a blog can be removed', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.map((blog) => blog.title);
  expect(contents).not.toContain(blogToDelete.title);
});

afterAll(async () => {
  await mongoose.connection.close();
});
