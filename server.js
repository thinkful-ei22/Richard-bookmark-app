'use strict';

// Load array of notes
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT } = require('./config');

const bookmarkRouter = require('./routes/bookmarks');

const app = express();

app.use(morgan('dev'));

app.use((express.static('public')));

app.use(cors());

app.use(express.json());

// Mount routers under here
app.use('/api/bookmarks', bookmarkRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, {message: err.message});
    res.status(err.status).json(errBody);
  } else {
    console.error(err);
    res.status(500).json({message: 'Internal Service Error'});
  }
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});