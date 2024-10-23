# AUTHENTICATION-PROJECT
# PROJECT-AI

A full-stack web application with user authentication using **MERN stack** (MongoDB, Express.js, React, and Node.js). This project features a protected routing mechanism, JWT-based authentication, and user signup/login functionality.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [How to Use](#how-to-use)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This is a full-stack authentication project that allows users to register, log in, and access protected routes. The app uses JWT (JSON Web Token) for session management and includes mechanisms to ensure that users are authenticated before accessing certain routes.

## Features

- **User Signup**: Allows new users to create an account.
- **User Login**: Authenticate existing users.
- **JWT Authentication**: Uses JWT to manage user sessions.
- **Protected Routes**: Routes that require authentication to access.
- **Token Validation**: Tokens are validated against the backend to ensure authenticity.
- **Logout**: Removes the stored JWT token from local storage and redirects to the login page.
- **Responsive Design**: Built using Bootstrap for a modern and responsive design.

## Technologies Used

### Frontend
- React
- React Router v6
- Axios
- Bootstrap
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed and running on `localhost:27017`.

# Backend Environment Variables
NODE_ENV=development
PORT=5000
MONGODB_URI_DEV=mongodb://localhost:27017/yourDatabaseName
MONGODB_URI_PROD=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourDatabaseName
JWT_SECRET=yourSecretKey

# PROJECT STRUCTURE:

PROJECT-AI
├── BACKEND
│   ├── src
│   │   ├── auth
│   │   │   ├── controllers
│   │   │   │   └── userController.js
│   │   │   ├── middleware
│   │   │   │   └── authMiddleware.js
│   │   │   └── routes
│   │   │       └── authRoutes.js
│   │   ├── config
│   │   │   └── db.js
│   │   └── server.js
│   └── package.json
├── FRONTEND
│   ├── src
│   │   ├── components
│   │   │   └── Navbar.js
│   │   ├── pages
│   │   │   ├── Home.js
│   │   │   ├── Signup.js
│   │   │   ├── Login.js
│   │   │   └── About.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md


# How to Use:
Register:
Visit http://localhost:3000/signup to create a new account.
Login:
Go to http://localhost:3000/login and sign in with your credentials.
Protected Routes:
Once logged in, you can access the homepage or other protected routes. If you attempt to access a protected route without being logged in, you will be redirected to the login page.
Logout:
Click the "Logout" button on the navigation bar to log out and clear the session.
