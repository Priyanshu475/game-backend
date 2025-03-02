const fs = require('fs');
const path = require('path');
const Trivia = require('../models/Trivia');

const seedDatabase = async () => {
  try {
    const jsonFile = path.join(__dirname, '../Dataset.json');
    const triviaData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
    
    await Trivia.deleteMany(); // clears old data
    await Trivia.insertMany(triviaData);
    console.log('Data seeded');
  } catch (error) {
    console.error('Error seeding', error);
  }
};

module.exports = seedDatabase;