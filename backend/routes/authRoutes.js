const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign-Up Endpoint
router.post('/signup', authController.signUp);

// Login Endpoint with JWT
router.post('/login', authController.login);

module.exports = router;
