const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module
const cors = require('cors'); // Add CORS for cross-origin requests
const dotenv = require('dotenv'); // For environment variables
const authRoutes = require('./backend/routes/authRoutes'); // Authentication routes
const dashboardRoutes = require('./backend/routes/dashboardRoutes'); // Dashboard routes
const { verifyToken, checkRole } = require('./backend/middleware/auth'); // Token Verification and Role-Based Access Control middleware

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for handling cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'frontend/assets'))); // Serve static assets (CSS, JS, images)

// Route to serve the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/pages/index.html')); // Corrected path to index.html
});

// Authentication Routes (For login, signup, etc.)
app.use('/api/auth', authRoutes); // Authentication routes under /api/auth

// Dashboard Routes (Protected routes, user data, etc.)
app.use('/api/dashboard', verifyToken, dashboardRoutes); // Dashboard routes under /api/dashboard, protected by JWT

// Example of Role-Based Access Control (Admin only)
app.use('/api/admin', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

// Default Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).send('Something went wrong!'); // Send error response
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

