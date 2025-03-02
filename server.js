const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/db');
const seedDatabase = require('./utils/seedDatabase');
const userRoutes = require('./routes/userRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const triviaRoutes = require('./routes/triviaRoutes');

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Seed database
seedDatabase();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/trivia', triviaRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));