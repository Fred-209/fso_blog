const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');

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

const initialUsers = (async () => {
  const passwordHash = await bcrypt.hash('sekret', 10);

  const users = [
    {
      username: 'testuser1',
      name: 'Test user 1',
      passwordHash,
    },
    {
      username: 'testuser2',
      name: 'Test user 2',
      passwordHash,
    },
    {
      username: 'testuser3',
      name: 'Test user 3',
      passwordHash,
    },
    {
      username: 'root',
      passwordHash,
    },
  ];
  return users;
})();

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb, initialUsers,
};
