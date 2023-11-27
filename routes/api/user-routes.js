const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user-controller');

// Define routes for user operations
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile/:userId', UserController.getUserProfile);

// Add more routes for other user-related operations

module.exports = router;
