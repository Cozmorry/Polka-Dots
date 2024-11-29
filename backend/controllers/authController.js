const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Database connection

const SECRET_KEY = process.env.JWT_SECRET || 'yoursecretkey';  // Use environment variable for secret key

// Controller for sign-up
const signUp = async (req, res) => {
  const { username, email, phone, password } = req.body;

  // Validate input
  if (!username || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  // Email and phone number validation (you can refine these regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;  // Example for 10 digit phone numbers (modify as needed)

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format!' });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number!' });
  }

  try {
    // Check if email or username already exists
    const [existingUser] = await db.promise().query('SELECT * FROM customers WHERE email = ? OR username = ?', [email, username]);

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email or username already exists!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the database
    const query = 'INSERT INTO customers (username, email, phone, password) VALUES (?, ?, ?, ?)';
    await db.promise().query(query, [username, email, phone, hashedPassword]);

    res.status(201).json({ message: 'Customer registered successfully!' });
  } catch (err) {
    console.error('Sign-up error:', err);
    res.status(500).json({ message: 'Error registering customer. Please try again later.' });
  }
};

// Controller for login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required!' });
  }

  try {
    const [rows] = await db.promise().query('SELECT * FROM customers WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: { id: user.id, username: user.username, role: user.role } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in. Please try again later.' });
  }
};

// Controller for fetching customer dashboard
const getDashboard = async (req, res) => {
  try {
    const customerId = req.user.id; // Extract customer ID from token
    const [orders] = await db.promise().query('SELECT * FROM orders WHERE customer_id = ?', [customerId]);

    res.status(200).json({ 
      message: 'Dashboard data fetched successfully', 
      username: req.user.username, 
      orders 
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Error fetching dashboard data. Please try again later.' });
  }
};

// Exporting the controllers to be used in routes
module.exports = {
  signUp,
  login,
  getDashboard
};
