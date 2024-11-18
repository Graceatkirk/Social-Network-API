# Social Network API
This project is a Social Network API that allows users to manage thoughts, reactions, and friends. The API is built using Node.js, Express.js, and MongoDB, with Mongoose for database modeling.

## Features
User Management:
-Create, retrieve, update, and delete users.
-Add and remove friends for each user.

Thought Management:
-Create, retrieve, update, and delete thoughts.
-Users can add reactions to thoughts.
-Users can delete specific reactions from thoughts.

Friend Management:
-Add and remove friends by user ID.

Reactions:
-Add and remove reactions to specific thoughts.

## Table of Contents
-Installation
-Usage
-API Routes
-Technologies Used
-License

## Installation
Clone the Repository:
-bash:

git clone https://github.com/Graceatkirk/Social-Network-API.git
cd social-network-api

-Install Dependencies: Ensure you have Node.js and npm installed. Then run:

bash:
npm install

-Set Up MongoDB: Ensure MongoDB is installed and running locally or use a MongoDB cloud service (e.g., MongoDB Atlas). Update the database connection string in your .env file.

-Environment Variables: Create a .env file in the root of your project with the following content:

env:
MONGO_URI=mongodb://localhost:27017/social-network-api
PORT=5000

-Run the Server: Start the server with:

bash

npm run start

or, for development:

bash

npm run dev

-Test the API: Use tools like Insomnia, Postman, or cURL to test the API endpoints.

## Usage
Example Video
https://drive.google.com/file/d/1HRtKbSqOSp6D8gnZmu1uyWXQ-5BgcTqZ/view?usp=sharing

Example Scenarios
Add a Thought:
-POST /api/thoughts

Body:
json
{
  "thoughtText": "This is my first thought!",
  "username": "john_doe"
}

Add a Reaction to a Thought:
-POST /api/thoughts/:thoughtId/reactions

Body:
json
{
  "reactionBody": "Great thought!",
  "username": "jane_doe"
}

Add a Friend to a User:
-PUT /api/users/:userId/friends/:friendId

Delete a Reaction:
-DELETE /api/thoughts/:thoughtId/reactions/:reactionId

API Documentation
-For detailed API routes and usage, see the API Routes section below.

## API Routes
User Routes:
-Get All Users: GET /api/users
-Get User by ID: GET /api/users/:userId
-Create User: POST /api/users
-Update User: PUT /api/users/:userId
-Delete User: DELETE /api/users/:userId
-Add Friend: PUT /api/users/:userId/friends/:friendId
-Remove Friend: DELETE /api/users/:userId/friends/:friendId

Thought Routes:
-Get All Thoughts: GET /api/thoughts
-Get Thought by ID: GET /api/thoughts/:thoughtId
-Create Thought: POST /api/thoughts
-Update Thought: PUT /api/thoughts/:thoughtId
-Delete Thought: DELETE /api/thoughts/:thoughtId
-Add Reaction: POST /api/thoughts/:thoughtId/reactions
-Remove Reaction: DELETE /api/thoughts/:thoughtId/reactions/:reactionId

Technologies Used
-Node.js: JavaScript runtime for building server-side applications.
-Express.js: Web framework for Node.js.
-MongoDB: NoSQL database for storing application data.
-Mongoose: ODM library for MongoDB.
-Dotenv: Environment variable management.

## License
This project is licensed under the MIT License.

## Notes
Ensure that the database connection string in your .env file is correctly set up.
Run the application with npm run dev during development for live reloading.

