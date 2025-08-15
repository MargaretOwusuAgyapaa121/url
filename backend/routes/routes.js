// backend/src/routes/url.routes.js
const express = require('express');
const router = express.Router();

const {
  shortenUrl,
  getAnalytics,
} = require('../controller/url.controller');

// POST /api/shorten
router.post('/shorten', shortenUrl);

// GET /api/analytics/:shortId
router.get('/analytics/:shortId', getAnalytics);

module.exports = router;
