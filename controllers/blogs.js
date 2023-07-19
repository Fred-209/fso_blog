const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// blogRouter.get('/', async (request, response) => {
//   try {
//     response.send('Hello, world!');
//   } catch (error) {
//     response.status(500).send(error.message);
//   }
// });

blogRouter.get('/', async (request, response) => {
  try {
    console.log('testing...');
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

blogRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

module.exports = blogRouter;
