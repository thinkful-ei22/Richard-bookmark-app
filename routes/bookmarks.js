'use strict';

const express = require('express');

const router = express.Router();

const knex = require('../knex');

router.get('/',(req, res, next) => {
  console.log('working');
  knex
    .select()
    .from('bookmarks')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

module.exports = router;