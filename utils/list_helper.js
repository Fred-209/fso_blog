const _ = require('lodash');
// total likes in this blog list is 36

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const dummy = (blogList) => 1;

const totalLikes = (blogList) => blogList.reduce((likesSum, blog) => likesSum + blog.likes, 0);

const favoriteBlog = (blogList) => _.maxBy(blogList, 'likes');

const mostLikes = (blogList) => {
  const authorLikesMap = {};

  for (const blog of blogList) {
    authorLikesMap[blog.author] = (authorLikesMap[blog.author] || 0) + blog.likes;
  }

  const authorWithMostLikes = _.maxBy(Object.entries(authorLikesMap), ([, likes]) => likes);

  return {
    author: authorWithMostLikes[0],
    likes: authorWithMostLikes[1],
  };
};

const mostBlogs = (blogList) => {
  const groupedByAuthor = _.groupBy(blogList, 'author');
  const authorWithMostBlogs = _.maxBy(
    Object.entries(groupedByAuthor),
    ([, blogsList]) => blogsList.length,
  );

  return {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1].length,
  };
};

module.exports = {
  dummy,
  totalLikes,
  blogs,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
