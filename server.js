// server.js

const express = require('express');
const routes = require('./routes/api');
const db = require('./config/connection'); // Import the MongoDB connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON request body parsing
app.use(express.json());

// API routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
