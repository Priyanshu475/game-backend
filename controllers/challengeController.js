const Challenge = require('../models/Challenge');

/**
 * Creates a new challenge with an invite link
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing challenge information
 * @param {string} req.body.inviter - Username of the user creating the challenge
 * @param {number} req.body.score - Score of the inviter to be displayed in the challenge
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the created challenge or error message
 */
const createChallenge = async (req, res) => {
  try {
    const { inviter, score } = req.body;
    const inviteLink = `${process.env.challengeUrl}/challenge/${inviter}}`;
    const challenge = await Challenge.create({ inviter, score, inviteLink });
    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ error: 'Error creating challenge' });
  }
};

/**
 * Retrieves a challenge by its ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - MongoDB ID of the challenge to retrieve
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the challenge details or error message
 */
const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createChallenge,
  getChallenge
};