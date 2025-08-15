// backend/src/controllers/url.controller.js
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const Url = require('../models/model');
const QRCode = require('qrcode');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

// POST /api/shorten
exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl, customAlias, expiresAt, password } = req.body;

    let shortId = customAlias || nanoid(8);

    // Check for existing alias
    const existing = await Url.findOne({ where: { shortId } });
    if (existing) {
      return res.status(400).json({ error: 'Alias already in use' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const newUrl = await Url.create({
      originalUrl,
      shortId,
      customAlias,
      password: hashedPassword,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    const shortUrl = `${BASE_URL}/${shortId}`;
    const qrCode = await QRCode.toDataURL(shortUrl);

    res.status(201).json({ shortUrl, qrCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /:shortId
exports.redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ where: { shortId } });

    if (!url) return res.status(404).send('Link not found');

    // Check expiration
    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).send('Link has expired');
    }

    url.clickCount += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// GET /api/analytics/:shortId
exports.getAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ where: { shortId } });

    if (!url) return res.status(404).json({ error: 'Link not found' });

    res.json({
      originalUrl: url.originalUrl,
      shortId: url.shortId,
      clickCount: url.clickCount,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
