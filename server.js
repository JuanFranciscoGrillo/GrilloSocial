// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';

// Create express app
const app = express();

// Set port number
const PORT = process.env.PORT || 3001;

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Import routes
app.use(require('./routes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/GrilloSocial', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Enable MongoDB query logging
mongoose.set('debug', true);

// Start the server
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));