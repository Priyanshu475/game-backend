const express = require('express');
const router = express.Router();
const { createChallenge, getChallenge } = require('../controllers/challengeController');

// Create new challenge
router.post('/create', createChallenge);

// Get challenge by ID
router.get('/:id', getChallenge);

module.exports = router;