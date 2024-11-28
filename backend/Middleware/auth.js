const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Use an environment variable for security

// Base middleware for token authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Authorization header missing or improperly formatted!' });
    }

    if (!token) {
        return res.status(403).json({ message: 'Token is required!' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token!' });
        }

        req.user = decoded; // Attach decoded user info (e.g., id, role) to the request
        next();
    });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

// Middleware to check if the user is admin or staff
const isAdminOrStaff = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'staff') {
        return res.status(403).json({ message: 'Access denied. Admins or staff only.' });
    }
    next();
};

// Middleware to check if the user is staff
const isStaff = (req, res, next) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ message: 'Access denied. Staff only.' });
    }
    next();
};

// Middleware to check if the user is a customer
const isCustomer = (req, res, next) => {
    if (req.user.role !== 'customer') {
        return res.status(403).json({ message: 'Access denied. Customers only.' });
    }
    next();
};

// Enhanced logging for debugging (Optional)
const logAccess = (req, res, next) => {
    console.log(`[ACCESS LOG] User: ${req.user.id}, Role: ${req.user.role}, Path: ${req.path}`);
    next();
};

module.exports = {
    authenticateToken,
    isAdmin,
    isAdminOrStaff,
    isStaff,
    isCustomer,
    logAccess, // Optional, for access tracking
};
