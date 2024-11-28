const express = require('express');
const path = require('path');
const authRoutes = require('./authRoutes'); // Import authentication routes (login, signup, etc.)
const dashboardRoutes = require('./dashboardRoutes'); // Import dashboard routes (protected routes)

// Initialize the router
const router = express.Router();

// Serve the landing page (index.html) for the root route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));  // Ensure correct path for index.html
});

// API Routes
router.use('/auth', authRoutes);  // Authentication routes (signup, login, etc.)
router.use('/dashboard', dashboardRoutes);  // Dashboard routes

// 404 Route (If an invalid endpoint is accessed)
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = router;
