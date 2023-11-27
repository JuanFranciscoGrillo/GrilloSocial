// Import the express module
const express = require('express');

// Create a router object
const router = express.Router();

// Import the necessary controller functions
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller');

// Set up GET all users and POST user creation routes at /api/users
router.get('/', getAllUser);
router.post('/', createUser);

// Set up GET user by ID, PUT user update, and DELETE user routes at /api/users/:id
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Set up POST add friend and DELETE delete friend routes at /api/users/:userId/friends/:friendId
router.post('/:userId/friends/:friendId', addFriend);
router.delete('/:userId/friends/:friendId', deleteFriend);

// Export the router
module.exports = router;

// The MongoDB connection string is mongodb://localhost:27017/GrilloSocial