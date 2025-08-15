// backend/src/middleware/index.js
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const setupMiddlewares = (app) => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
};

module.exports = setupMiddlewares;
