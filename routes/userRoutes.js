const express = require('express');
const router = express.Router();
const { registerUser, getUserScore } = require('../controllers/userController');

// Register new user
router.post('/register', registerUser);

// Get user score
router.get('/:username/score', getUserScore);

module.exports = router;