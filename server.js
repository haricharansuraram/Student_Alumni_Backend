// server.js
const express = require('express');
const cors = require('cors'); // NEW: Import the cors middleware
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// NEW: Use cors middleware to allow cross-origin requests
app.use(cors());

// Main routes for user authentication
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/chats', chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`.yellow.bold);
});
