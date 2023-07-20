const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { nonExistingId } = require('../tests/test_helpers');

// fetch all blogs
blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    // response.status(500).send(error.message);
    next(error);
  }
});

// add a new blog
blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    // response.status(400).send(error.message);
    next(error);
  }
});

// fetch a specific blog
blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// delete a blog
blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
