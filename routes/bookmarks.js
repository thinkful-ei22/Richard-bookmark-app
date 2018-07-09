'use strict';

const express = require('express');

const router = express.Router();

const knex = require('../knex');

router.get('/',(req, res, next) => {
  knex
    .select()
    .from('bookmarks')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.post('/',(req, res, next) => {
  const { title, url, desc, rating } = req.body;
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  if (!url) {
    const err = new Error('Missing `URL` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { title, weburl: url, descript: desc, rating };

  knex
    .insert(newItem)
    .into('bookmarks')
    .returning(['id', 'title', 'weburl', 'descript', 'rating'])
    .then((results) => {
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex
    .from('bookmarks')
    .where('bookmarks.id', id)
    .del()
    .then(results => {
      if (results) {
        res.sendStatus(204);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

module.exports = router;