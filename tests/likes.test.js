const { totalLikes, blogs, favoriteBlog, mostBlogs } = require('../utils/list_helper');

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  const mostLikedBlog = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  };

  test('when list has only one blog, returns that blog', () => {
    const result = favoriteBlog([blogs[0]]);
    expect(result).toEqual(blogs[0]);
  });

  test('of a bigger list is calculated right', () => {
    console.log(favoriteBlog(blogs));
    expect(favoriteBlog(blogs)).toEqual(mostLikedBlog);
  });
});

describe('author with most blogs', () => {
  test('when list only has one entry, returns that formatted blog', () => {
    const blogList = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ];

    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    };

    const result = mostBlogs(blogList);
    expect(result).toEqual(expected);
  });

  test('of a bigger list is calculated right', () => {
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    };

    const result = mostBlogs(blogs);
    expect(result).toEqual(expected);
  });
});
