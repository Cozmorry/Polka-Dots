CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,  -- Unique username for the customer
  email VARCHAR(100) NOT NULL UNIQUE,    -- Unique email address for login
  phone VARCHAR(15) NOT NULL UNIQUE,     -- Unique phone number (if used for login/notification)
  password VARCHAR(255) NOT NULL,         -- Password for the customer
  address TEXT,                          -- Optional field to store customer address
  profile_picture VARCHAR(255) DEFAULT NULL, -- Optional field to store the URL of the profile picture
  status ENUM('active', 'inactive') DEFAULT 'active', -- Default status is 'active'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the customer record is created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Timestamp for updates
  INDEX(email),                           -- Index on email for faster searches
  INDEX(phone),                           -- Index on phone number for faster searches
  INDEX(username)                         -- Index on username for faster searches
);
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255),
  pizza VARCHAR(255),
  status ENUM('Pending', 'Delivered') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

