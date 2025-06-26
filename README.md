# 📇 Contacts App

Welcome to the **Contacts App** — a full-stack application built with **Node.js** (Backend) and **React.js** (Frontend). This project was developed to demonstrate core skills in modern JavaScript development, including user authentication, CRUD operations, and testing practices.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register with a valid email and password
  - Login functionality with **JWT-based authentication**

- 📋 **Contact Management**  
  After logging in, users can:
  - Add new contacts
  - Edit existing contacts
  - View contact details
  - Delete contacts

---

## 🧱 Tech Stack

**Frontend:**
- React.js
- React Router
- Redux for Statemanagement / Local Storage for auth

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for secure authentication

**Testing:**
- Jest
- React Testing Library
- Supertest (for API testing)

**Tooling:**
- Concurrently
- Nodemon
- dotenv

---

## 📁 Project Structure

```
root/
├── server/       # Node.js backend with Express + MongoDB + JWT
│   ├── routes/           # Express route handlers
│   ├── controllers/      # Logic for route handling
│   ├── models/           # Mongoose schemas
│   └── middleware/       # Auth & error-handling middleware
│
├── client/       # React.js frontend
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components (views)
│   └── services/         # API interaction logic
│
├── package.json  # Root scripts to run client and server
```

---

## ⚙️ Getting Started

Follow these steps to install dependencies and run the project locally:

```bash
# Step 1: Install root dependencies
npm install

# Step 2: Install backend dependencies
cd server
npm install

# Step 3: Install frontend dependencies
cd ../client
npm install

# Step 4: Return to root and start both client and server
cd ..
npm run start   #This command runs both the frontend and backend concurrently using a single terminal.
```
---

## 🧪 Running Tests
Test suites are provided for both frontend and backend code.

**Run frontend (React) tests**
```bash
npm run test:client
```

**Run backend (Node.js) tests**
```bash
npm run test:server
```



