const express = require('express');
const router = express.Router();
const { getRandomTrivia, processAnswer } = require('../controllers/triviaController');

// Get random trivia
router.get('/random', getRandomTrivia);

// Process user's answer
router.post('/answer', processAnswer);

module.exports = router;