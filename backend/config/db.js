const mysql = require('mysql2');
require('dotenv').config();  // Load environment variables from .env file

// Create a connection pool using environment variables
const db = mysql.createPool({
  host: process.env.DB_HOST,       // Database host
  user: process.env.DB_USER,       // Database username
  password: process.env.DB_PASSWORD || '', // Password (if any, else empty string)
  database: process.env.DB_NAME,   // Database name
  waitForConnections: true,        // Wait for a connection if the pool is exhausted
  connectionLimit: 10,             // Max number of connections to create at once
  queueLimit: 0                    // Max number of connection requests to queue
});

// Test the connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    process.exit(1);  // Exit the process if database connection fails
  }
  console.log('Connected to the MySQL database');
  connection.release();  // Release the connection back to the pool after testing
});

// Export the db connection pool for use in other files
module.exports = db;
