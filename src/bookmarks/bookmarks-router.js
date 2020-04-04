'use strict';
const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../logger');
const { bookmarks } = require('../store/store');
const BookmarksService = require('../bookmarks-service');

const bookmarksRouter = express.Router();
const bodyParser = express.json();



bookmarksRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    BookmarksService.getAllBookmarks(knexInstance)
      .then(bookmarks => {
        res.json(bookmarks);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;

    const id = uuid();

    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    };

    if (!title) {
      logger.error('Title is required');
      return res
        .status(400)
        .send('Invalid Data');
    }

    if (!url) {
      logger.error('URL is required');
      return res
        .status(400)
        .send('Invalid Data');
    }

    if (!description) {
      logger.error('Description is required');
      return res
        .status(400)
        .send('Invalid Data');
    }

    if (!rating) {
      logger.error('Rating is required');
      return res
        .status(400)
        .send('Invalid Data');
    }

    bookmarks.push(bookmark);

    logger.info(`Bookmark with id ${bookmark.id} has been created`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
      .json(bookmark);

  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res, next) => {
    const { id } = req.params;
    const knexInstance = req.app.get('db');
    BookmarksService.getById(knexInstance, id)
      .then(bookmarks => {
        //const bookmark = bookmarks.find(b => b.id == id);
        if (!bookmarks || bookmarks ==='') {
          logger.error(`Bookmark with id ${id} not found`);
          return res
            .status(404)
            .send('Bookmark Not Found');
        }
        res.json(bookmarks);
      })
      .catch(next);
    
    
  })
  .delete((req, res) => {
    const { id } = req.params;

    const bookmarkIndex = bookmarks.findIndex(b => b.id === id);

    if (!bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found`);
      return res
        .status(404)
        .send('Not Found');
    }

    bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Card with id ${id} deleted`);

    res
      .status(204)
      .end();
  });

module.exports = bookmarksRouter;