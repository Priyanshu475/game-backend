# Game App API

## Overview
This is a **Game App API** built using **Node.js, Express, and MongoDB** following the **MVC (Model-View-Controller)** architecture. The API allows users to register, participate in trivia challenges, and track scores.

## Features
- **User Management**: Register users and track their scores.
- **Challenges**: Create and retrieve trivia challenges.
- **Trivia Questions**: Fetch random trivia questions, validate answers, and provide fun facts.
- **MongoDB Integration**: Stores user data, challenges, and trivia questions.
- **Seed Database**: Populates trivia data from a JSON file.

## Project Structure
```
📂 project-root
│-- 📂 controllers       # Handles request logic
│   │-- userController.js
│   │-- challengeController.js
│   │-- triviaController.js
│
│-- 📂 models            # Defines database schemas
│   │-- User.js
│   │-- Challenge.js
│   │-- Trivia.js
│
│-- 📂 routes            # Defines API routes
│   │-- userRoutes.js
│   │-- challengeRoutes.js
│   │-- triviaRoutes.js
│
│-- 📂 config            # Configuration files (e.g., database connection)
│   │-- db.js
│
│-- 📂 seed              # Seeds trivia data
│   │-- seedDatabase.js
│
│-- server.js           # Entry point of the app
│-- .env                # Environment variables
│-- package.json        # Dependencies and scripts
```

## Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd project-root
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a **.env** file and set the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   ```

4. Seed the database (if running for the first time):
   ```sh
   node seed/seedDatabase.js
   ```

5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### User Routes
| Method | Endpoint                 | Description                    |
|--------|--------------------------|--------------------------------|
| POST   | `/api/user/register`     | Register a new user            |
| GET    | `/api/user/:username/score` | Get user's current score     |

### Challenge Routes
| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/api/challenges/create`  | Create a new challenge         |
| GET    | `/api/challenges/:id`     | Get challenge details          |

### Trivia Routes
| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/trivia/random`      | Fetch a random trivia question |
| POST   | `/api/trivia/answer`      | Submit an answer and get feedback |

## Contributing
Feel free to fork the repository and submit pull requests with improvements or bug fixes.

## License
This project is licensed under the MIT License.

