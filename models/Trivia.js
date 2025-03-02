const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  clues: [String],
  fun_fact: [String],
  trivia: [String],
}, { timestamps: true });

module.exports = mongoose.model('Trivia', triviaSchema);