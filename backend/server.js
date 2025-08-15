// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const { connectToDatabase, sequelize } = require('./config/database'); // ✅ import sequelize
const setupMiddlewares = require('./middleware/index');
const urlRoutes = require('./routes/routes');
const { redirectToOriginalUrl } = require('./controller/url.controller');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
setupMiddlewares(app);

// Routes
app.use('/api', urlRoutes);
app.get('/:shortId', redirectToOriginalUrl); // Redirection handler

// DB Connection
connectToDatabase();

// ✅ Sync Sequelize models with the database
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced with models"))
  .catch(err => console.error("❌ DB sync failed:", err));

app.get('/', (req, res) => {
  res.send('✅ Backend is working successfully! 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
