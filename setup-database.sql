-- Database setup for CosmeticLux
-- Run this to create/update the users table with correct schema

USE cosmeticluxdb;

-- Check if table exists and drop it if needed (be careful with this in production!)
-- DROP TABLE IF EXISTS users;

-- Create users table with proper schema
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin@123)
-- The password hash below is bcrypt hash of 'admin@123'
INSERT IGNORE INTO users (username, email, password, role) 
VALUES (
  'admin', 
  'admin@cosmeticlux.com', 
  '$2a$10$YourHashedPasswordHere',
  'admin'
);

-- Alternative: If your table already exists with 'email' column, add username column
-- ALTER TABLE users ADD COLUMN username VARCHAR(255) UNIQUE AFTER id;
-- UPDATE users SET username = email WHERE username IS NULL;

-- Show table structure
DESCRIBE users;

-- Show existing data
SELECT id, username, email, role, created_at FROM users;
