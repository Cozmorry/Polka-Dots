const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/auth');  // Destructure the import
const db = require('../config/db'); // Database connection

// Route to fetch dashboard data (e.g., orders, profile info)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Extract the user ID from the token

        if (!userId) {
            return res.status(401).json({ message: 'Invalid token or user not authenticated' });
        }

        console.log(`Fetching dashboard data for user ID: ${userId}`);

        // Example query to get user orders
        const query = 'SELECT * FROM orders WHERE user_id = ?';
        const [orders] = await db.promise().query(query, [userId]);

        // Optional: Fetch additional data (e.g., user profile)
        const profileQuery = 'SELECT username, email FROM customers WHERE id = ?';
        const [profile] = await db.promise().query(profileQuery, [userId]);

        res.status(200).json({
            message: 'Dashboard data retrieved successfully',
            profile: profile[0] || {},
            orders,
        });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

module.exports = router;
