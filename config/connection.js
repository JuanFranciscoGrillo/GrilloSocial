const mongoose = require('mongoose');

// Replace "YOUR_MONGODB_URI" with your actual MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/GrilloSocial';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for successful connection
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Export the database connection
module.exports = db;
