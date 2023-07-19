const Blog = require('../models/blog');

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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs, nonExistingId, blogsInDb,
};
