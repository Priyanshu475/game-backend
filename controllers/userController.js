const User = require('../models/User');

/**
 * Registers a new user in the system
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing user information
 * @param {string} req.body.username - Username for the new user
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the created user or error message
 */
const registerUser = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create new user
    const user = await User.create({ username });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

/**
 * Retrieves the score for a specific user
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.username - Username of the user whose score to retrieve
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the user's score or error message
 */
const getUserScore = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ score: user.score });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerUser,
  getUserScore
};