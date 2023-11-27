// Importing required modules
const express = require('express');

// Creating a router instance
const router = express.Router();

// Importing user routes
const userRoutes = require('./user-routes');

// Importing thought routes
const thoughtRoutes = require('./thought-routes');

// Mounting user routes under '/users' endpoint
router.use('/users', userRoutes);

// Mounting thought routes under '/thoughts' endpoint
router.use('/thoughts', thoughtRoutes);

// Exporting the router
module.exports = router;

// MongoDB connection string
// mongodb://localhost:27017/GrilloSocial