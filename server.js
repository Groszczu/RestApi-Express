require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(morgan(process.env.LOG_FORMAT));
app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
