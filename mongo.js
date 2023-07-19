const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fdurham:${password}@cluster0.7uvkesk.mongodb.net/testBlogApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const blog = new Blog({
  title: 'Second test of blog in test database',
  author: 'Fred Durham',
  url: 'http://www.launchschool.com',
  likes: 15,
});

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'Second test note of test database collection',
//   important: false,
// });

// const findNote = async () => {
//   const notes = await Note.find({});
//   notes.forEach(note => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// };

// findNote();

const saveBlog = async () => {
  try {
    await blog.save();
    console.log('blog saved');
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

saveBlog();
