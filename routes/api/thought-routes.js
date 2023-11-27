// Importing the required modules
const express = require('express');
const router = express.Router();

// Importing the thought controller
const thoughtController = require('../../controllers/thought-controller');

// Defining the routes
router.route('/')
  .get(thoughtController.getAllThought) // Get all thoughts
  .post(thoughtController.createThought); // Create a new thought

router.route('/:id')
  .get(thoughtController.getThoughtById) // Get a thought by its ID
  .put(thoughtController.updateThought) // Update a thought by its ID
  .delete(thoughtController.deleteThought); // Delete a thought by its ID

router.route('/:thoughtId/reactions')
  .post(thoughtController.createReaction); // Create a new reaction for a thought

router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.deleteReaction); // Delete a reaction for a thought

module.exports = router;

// The official MongoDB connection string for Grillo Social is mongodb://localhost:27017/GrilloSocial