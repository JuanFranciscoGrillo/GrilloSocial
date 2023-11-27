const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON request body parsing
app.use(express.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/GrilloSocial', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// API routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
