
# Grahaye Climat+ Full-Stack Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for the Grahaye Climat+ platform.

## Project Structure

- **`/` (root)**: Contains the React frontend application.
- **`/server`**: Contains the Node.js, Express, and MongoDB backend application.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community): You need a running MongoDB instance, either locally or a cloud-based one like MongoDB Atlas.

## Setup & Installation

Follow these steps to get the application running on your local machine.

### 1. Clone the repository

If you haven't already, clone the project to your local machine.

### 2. Install Backend Dependencies

Navigate to the project's root directory and run the following command to install all the necessary Node.js packages for the server.

```bash
npm install
```

### 3. Configure Environment Variables

The server requires several environment variables for database connection, authentication, and social logins.

1.  Navigate to the `server` directory.
2.  Create a new file named `.env`.
3.  Open the `.env` file and add your configuration. **Fill in your own details.**

```
# MongoDB Connection
MONGO_URI=mongodb://127.0.0.1:27017/grahaye_climat

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_12345
JWT_EXPIRES_IN=30d
SESSION_SECRET=your_super_secret_session_key_54321

# Google OAuth 2.0 Credentials
# Get these from the Google Cloud Console: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

### 4. Seed the Database (Initial Data & Users)

To populate the application with initial data and create default users (including an admin), run the seed script from the **root directory**.

```bash
npm run seed
```

This will create:
- An **admin** user: `admin@example.com` / `password123`
- A **regular** user: `user@example.com` / `password123`
- Sample data for courses, blog posts, and challenges.

## Running the Application

To run both the frontend Vite server and the backend Node.js server concurrently, use a single command from the **root directory**.

```bash
npm run dev
```

This will:
- Start the backend API server on **`http://localhost:5001`**.
- Start the frontend React development server, typically on **`http://localhost:5173`**.

Open your browser and navigate to the frontend URL. You can now log in using the credentials above or register a new account.
