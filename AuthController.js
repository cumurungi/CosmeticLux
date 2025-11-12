// backend/controllers/authController.js
import db from "./connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey123";

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // First, check what columns exist in the users table
    const [columns] = await db.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users'
    `, [process.env.DB_NAME || 'cosmeticluxdb']);
    
    const columnNames = columns.map(col => col.COLUMN_NAME.toLowerCase());
    const hasUsername = columnNames.includes('username');
    const hasEmail = columnNames.includes('email');
    
    console.log('📊 Available columns:', columnNames);
    console.log('✓ Has username column:', hasUsername);
    console.log('✓ Has email column:', hasEmail);

    // Build query based on available columns
    let query;
    let queryParams = [username];
    
    if (hasUsername && hasEmail) {
      // Try both username and email
      query = "SELECT * FROM cosmeticluxdb.users WHERE username = ? OR email = ?";
      queryParams = [username, username];
    } else if (hasUsername) {
      // Only username
      query = "SELECT * FROM cosmeticluxdb.users WHERE username = ?";
    } else if (hasEmail) {
      // Only email (treat username input as email)
      query = "SELECT * FROM cosmeticluxdb.users WHERE email = ?";
    } else {
      console.error('❌ No username or email column found in users table');
      return res.status(500).json({ message: "Database configuration error" });
    }

    console.log('🔍 Executing query:', query);
    const [rows] = await db.query(query, queryParams);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    console.log('✅ User found:', { id: user.id, identifier: user.username || user.email });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Use username if available, otherwise use email
    const userIdentifier = user.username || user.email;

    const token = jwt.sign(
      { id: user.id, username: userIdentifier, role: user.role || 'user' },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: { 
        id: user.id, 
        username: userIdentifier, 
        email: user.email || userIdentifier,
        role: user.role || 'user' 
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
