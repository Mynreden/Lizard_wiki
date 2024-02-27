# Lizard Web Application

## Overview
The Lizard Web Application is a full-stack project that allows users to manage lizard data, including adding new lizards, retrieving lizard images from external sources, and viewing recent lizard sightings. It consists of both backend API endpoints and frontend views for user interaction.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Multer for file uploads
- Multer Google Storage for uploading files to Google Cloud Storage
- EJS for server-side templating

## External APIs:
  - Google Translate API for translating lizard data (e.g., names, descriptions)
  - iNaturalist API for accessing recent lizard sightings
  - Unsplash API for fetching lizard images
  - Google Cloud Storage for storing images

## Installation
1. Clone the repository: `git clone https://github.com/Mynreden/Lizard_wiki.git`
2. Navigate to the project directory: `cd Lizard_wiki`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables:
     - `PORT`: Port number for the server (default is 3000).
     - `MONGO_URL`: MongoDB connection URL.
     - `JWT_SECRET_KEY`: Secret key for JWT token generation.
     - Other necessary configuration variables.
5. Start the server: `npm start`

## Features

### Add Lizard
- Allows users to add a new lizard to the database.

### Gallery
- Displays a gallery of lizard images fetched from Unsplash API.

### Sightings
- Shows recent lizard sightings retrieved from iNaturalist API.

### User Authentication
- Supports user authentication using JWT tokens.

## Routes

### Frontend Routes
- `/`: Main page
- `/login`: Login page
- `/posts/:id`: Post detail page
- `/profile`: User profile page
- `/admin/login`: Admin login page
- `/admin`: Admin dashboard page

### Backend API Routes
- `/auth`: Authentication routes (login, register)
- `/users`: User management routes (get, update, delete)
- `/comments`: Comment management routes (get, create, like)
- `/lizards`: Lizard management routes (add, gallery, sightings)

## Middleware

### Verify Token
- Middleware function to verify JWT token for protected routes.
- Usage: Include this middleware in routes that require authentication.

## Error Handling
If an error occurs during API operations, the server returns a status code of 500 along with an error message.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have suggestions for improvements.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
