const Trivia = require('../models/Trivia');
const User = require('../models/User');

/**
 * Retrieves a random trivia question with unique answer options
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing clues, options, correct answer, and a fun fact
 */
const getRandomTrivia = async (req, res) => {
  try {
    // Get total count of trivia documents
    const count = await Trivia.countDocuments();
    const random = Math.floor(Math.random() * count);
    
    // Get a random trivia item
    const trivia = await Trivia.findOne().skip(random);
    if (!trivia) return res.status(404).json({ error: 'No trivia found' });

    // Get random options, excluding the correct answer
    const options = await Trivia.aggregate([
      { $match: { city: { $ne: trivia.city } } }, // Exclude the correct answer
      { $sample: { size: 3 } }
    ]);
    
    // Add the correct answer to options
    options.push(trivia);
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    // Check for any duplicate cities in options (this shouldn't happen with the match stage, but as a safeguard)
    const uniqueOptionsMap = new Map();
    const uniqueOptions = [];
    
    for (const option of options) {
      if (!uniqueOptionsMap.has(option.city)) {
        uniqueOptionsMap.set(option.city, true);
        uniqueOptions.push(option);
      }
    }
    
    // If we somehow still don't have 4 unique options, fetch more
    if (uniqueOptions.length < 4) {
      const additionalOptions = await Trivia.aggregate([
        { 
          $match: { 
            city: { 
              $ne: trivia.city,
              $nin: uniqueOptions.map(opt => opt.city).filter(city => city !== trivia.city)
            } 
          }
        },
        { $sample: { size: 4 - uniqueOptions.length } }
      ]);
      
      uniqueOptions.push(...additionalOptions);
      uniqueOptions.sort(() => Math.random() - 0.5);
    }

    // Return formatted response
    res.json({
      clues: trivia.clues.slice(0, 2),
      options: uniqueOptions.map(opt => ({ city: opt.city, country: opt.country })),
      correctAnswer: trivia.city,
      funFact: trivia.fun_fact[Math.floor(Math.random() * trivia.fun_fact.length)]
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving trivia' });
  }
};

/**
 * Processes a user's answer to a trivia question, updates their score if correct,
 * and returns feedback with a fun fact
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing username, selectedAnswer, and correctAnswer
 * @param {string} req.body.username - User's username
 * @param {string} req.body.selectedAnswer - User's selected answer
 * @param {string} req.body.correctAnswer - The correct answer to the trivia question
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing whether the answer was correct, feedback, and a fun fact
 */
const processAnswer = async (req, res) => {
  try {
    const { username, selectedAnswer, correctAnswer } = req.body;
    
    // Find the user
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if answer is correct and update score
    let isCorrect = selectedAnswer === correctAnswer;
    if (isCorrect) {
      user.score += 10;
      await user.save();
    }
    
    // Get a fun fact related to the correct answer
    const trivia = await Trivia.findOne({ city: correctAnswer });
    const funFact = trivia ? trivia.fun_fact[Math.floor(Math.random() * trivia.fun_fact.length)] : "No fun fact available.";

    // Return response with feedback
    res.json({
      isCorrect,
      feedback: isCorrect ?
        '🎉 Correct! Here is a fun fact:' : '😢 Incorrect! Here is a fun fact:',
      funFact
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing answer' });
  }
};

module.exports = {
  getRandomTrivia,
  processAnswer
};