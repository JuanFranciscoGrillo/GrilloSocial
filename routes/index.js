// Import the necessary modules
const express = require('express');
const router = express.Router();

// Import all of the API routes from the 'api' directory
const apiRoutes = require('./api');

// Add prefix of '/api' to all of the API routes imported from the 'api' directory
router.use('/api', apiRoutes);

// Handle 404 errors
router.use((req, res) => {
  res.status(404).send('<h1>404 Error</h1>');
});

// Export the router module
module.exports = router;