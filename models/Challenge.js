const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  inviter: {
    type: String,
    required: true
  },
  invitee: {
    type: String,
  },
  score: {
    type: Number,
    required: true
  },
  inviteLink: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);