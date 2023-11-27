const express = require('express');
const router = express.Router();
const ThoughtController = require('../../controllers/thought-controller');

// Define routes for thought operations
router.post('/create', ThoughtController.createThought);
router.get('/all', ThoughtController.getAllThoughts);
router.post('/:thoughtId/reactions', ThoughtController.addReaction);

// Add more routes for other thought-related operations

module.exports = router;
