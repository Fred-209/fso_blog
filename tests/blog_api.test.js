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

test('has an "id" property and no "_id" property', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blog = blogsAtStart[0];

  expect(blog.id).toBeDefined();
  expect(blog._id).toBeUndefined();
});

test('blog post without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Fred Durham',
    url: 'http://www.launchschool.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201);

  const blogs = await helper.blogsInDb();
  const createdBlog = blogs.find((blog) => blog.title === newBlog.title);

  expect(createdBlog.likes).toBe(0);
});

describe('missing properties', () => {
  test('missing title has status 400', async () => {
    const missingTitleBlog = {
      url: 'http://www.launchschool.com',
      author: 'Fred Durham',
      likes: 22,
    };

    await api
      .post('/api/blogs')
      .send(missingTitleBlog)
      .expect(400);
  });

  test('missing url has status 400', async () => {
    const missingUrlBlog = {
      title: 'Test Blog',
      author: 'Fred Durham',
      likes: 22,
    };

    await api
      .post('/api/blogs')
      .send(missingUrlBlog)
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
