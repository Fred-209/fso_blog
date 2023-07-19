const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const blogRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');

const connectToMongo = async (url) => {
  try {
    await mongoose.connect(url);
    logger.info('connected to MongoDB');
  } catch (error) {
    logger.error('error connecting to MongoDB:', error.message);
  }
};

connectToMongo(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello, world!');
});

app.use('/api/blogs', blogRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
