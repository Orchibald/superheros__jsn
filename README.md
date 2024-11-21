# Superhero App

This project is a full-stack web application for managing superheroes. It consists of two main parts:

1. **Client-side**: A React-based front-end.
2. **Server-side**: A Node.js/Express back-end with a PostgreSQL database.

Follow the instructions below to set up and run the application.

---

## Prerequisites

Before starting, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- PostgreSQL database

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_directory>
```

### 2. Install Dependencies
**Client**
Navigate to the client directory and run:

```bash
cd client
npm install
```

**Server**
Navigate to the server directory and run:

```bash
cd server
npm install
```

Configuration
**Server**

Set up your PostgreSQL database and change setup in models/db.js

### 3. Running the Application
**Client**
To start the React development server, run:

```bash
cd client
npm run dev
```

The client will be available at http://localhost:5173 by default.

**Server**
To start the Node.js server in development mode, run:

```bash
cd server
npm run dev
```

The server will be available at http://localhost:3000 by default.


### 4. Technology Stack

**Frontend**
React: Component-based UI.
Redux Toolkit: State management.
React Router: Client-side routing.
Axios: HTTP client.
Sass: CSS preprocessor.

**Backend**
Node.js: Runtime environment.
Express: Web framework.
Sequelize: ORM for PostgreSQL.
Multer: File upload middleware.
