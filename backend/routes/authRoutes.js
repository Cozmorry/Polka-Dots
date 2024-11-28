const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import the auth controller
const authenticateToken = require('../middleware/auth'); // JWT authentication middleware

// Sign-Up Endpoint
router.post('/signup', authController.signUp);

// Login Endpoint with JWT
router.post('/login', authController.login);

// Customer Dashboard (Protected Route)
router.get('/dashboard', authenticateToken, authController.getDashboard);

module.exports = router;
