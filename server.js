// Import required modules
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Set the port number
const port = process.env.PORT || 3000; // Use environment variable for port

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.static(path.join(__dirname, 'frontend/assets'))); // Serve static files (CSS, JS, images)

// MySQL Database Connection Pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// JWT Secret for signing tokens (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey'; // Use environment variable for secret key

// Authentication Route: Login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the username and password were provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password.' });
    }

    // Query the database for the user
    const query = 'SELECT * FROM users WHERE username = ?';
    db.execute(query, [username], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            // If no user is found with that username
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const user = results[0];
        
        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Password comparison error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password.' });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

            // Send the response with the token
            res.json({
                message: 'Login successful!',
                token: token, // JWT token
                role: user.role, // The user role (can be 'admin', 'staff', or 'customer')
            });
        });
    });
});

// Example Route to Get User Dashboard (Requires JWT)
app.get('/api/auth/dashboard', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided, access denied.' });
    }

    // Verify the JWT token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        // If the token is valid, send the dashboard data
        const userId = decoded.id;

        // Sample query to get user orders (just an example)
        const query = 'SELECT * FROM orders WHERE user_id = ?';
        db.execute(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching orders.' });
            }

            res.json({ orders: results });
        });
    });
});

// Order Routes (for managing orders, protected by JWT)
app.post('/api/orders', (req, res) => {
    const { user_id, pizza_id, topping_id, quantity } = req.body;

    if (!user_id || !pizza_id || !quantity) {
        return res.status(400).json({ message: 'Please provide user_id, pizza_id, and quantity.' });
    }

    const query = 'INSERT INTO orders (user_id, pizza_id, topping_id, quantity) VALUES (?, ?, ?, ?)';
    db.execute(query, [user_id, pizza_id, topping_id, quantity], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.json({ message: 'Order placed successfully!', orderId: results.insertId });
    });
});

// Serve static files (if needed, like HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

