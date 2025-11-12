// Script to create a test admin user in the database
import db from "./connection.js";
import bcrypt from "bcryptjs";

async function createTestUser() {
  try {
    console.log("🔧 Checking database schema...\n");
    
    // Check what columns exist
    const [columns] = await db.query(`
      SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users'
      ORDER BY ORDINAL_POSITION
    `, [process.env.DB_NAME || 'cosmeticluxdb']);
    
    if (columns.length === 0) {
      console.error("❌ Users table not found!");
      console.log("\n💡 You need to create the users table first.");
      console.log("Run the SQL commands from setup-database.sql\n");
      process.exit(1);
    }

    console.log("📋 Current table schema:");
    columns.forEach(col => {
      console.log(`  - ${col.COLUMN_NAME} (${col.DATA_TYPE}) ${col.COLUMN_KEY ? `[${col.COLUMN_KEY}]` : ''}`);
    });

    const columnNames = columns.map(col => col.COLUMN_NAME.toLowerCase());
    const hasUsername = columnNames.includes('username');
    const hasEmail = columnNames.includes('email');
    const hasRole = columnNames.includes('role');

    console.log("\n🔍 Column availability:");
    console.log(`  - username: ${hasUsername ? '✅' : '❌'}`);
    console.log(`  - email: ${hasEmail ? '✅' : '❌'}`);
    console.log(`  - role: ${hasRole ? '✅' : '❌'}`);

    // Hash the password
    const plainPassword = "admin@123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    console.log("\n🔐 Creating test user...");
    console.log(`   Username/Email: admin`);
    console.log(`   Password: ${plainPassword}`);

    // Build INSERT query based on available columns
    let insertQuery;
    let insertParams;

    if (hasUsername && hasEmail && hasRole) {
      insertQuery = `
        INSERT INTO cosmeticluxdb.users (username, email, password, role) 
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE password = VALUES(password)
      `;
      insertParams = ['admin', 'admin@cosmeticlux.com', hashedPassword, 'admin'];
    } else if (hasUsername && hasRole) {
      insertQuery = `
        INSERT INTO cosmeticluxdb.users (username, password, role) 
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE password = VALUES(password)
      `;
      insertParams = ['admin', hashedPassword, 'admin'];
    } else if (hasEmail && hasRole) {
      insertQuery = `
        INSERT INTO cosmeticluxdb.users (email, password, role) 
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE password = VALUES(password)
      `;
      insertParams = ['admin@cosmeticlux.com', hashedPassword, 'admin'];
    } else if (hasUsername) {
      insertQuery = `
        INSERT INTO cosmeticluxdb.users (username, password) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE password = VALUES(password)
      `;
      insertParams = ['admin', hashedPassword];
    } else if (hasEmail) {
      insertQuery = `
        INSERT INTO cosmeticluxdb.users (email, password) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE password = VALUES(password)
      `;
      insertParams = ['admin@cosmeticlux.com', hashedPassword];
    } else {
      console.error("\n❌ Cannot create user: no username or email column found!");
      process.exit(1);
    }

    await db.query(insertQuery, insertParams);
    
    console.log("\n✅ Test user created/updated successfully!");
    console.log("\n📝 Login credentials:");
    console.log(`   Username: admin`);
    console.log(`   Password: ${plainPassword}`);
    console.log("\n🔗 You can now login with these credentials");

    // Show the created user
    const identifierColumn = hasUsername ? 'username' : 'email';
    const [users] = await db.query(
      `SELECT id, ${hasUsername ? 'username' : ''} ${hasEmail ? ', email' : ''} ${hasRole ? ', role' : ''}, created_at 
       FROM cosmeticluxdb.users 
       WHERE ${identifierColumn} = ?`,
      [hasUsername ? 'admin' : 'admin@cosmeticlux.com']
    );

    if (users.length > 0) {
      console.log("\n👤 User details:");
      console.log(users[0]);
    }

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

createTestUser();
