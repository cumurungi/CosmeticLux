// Quick script to check the users table schema
import db from "./connection.js";

async function checkSchema() {
  try {
    console.log("Checking users table schema...");
    
    const [columns] = await db.query(`
      SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY, EXTRA 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'cosmeticluxdb' 
      AND TABLE_NAME = 'users'
      ORDER BY ORDINAL_POSITION
    `);
    
    console.log("\n📋 Table: users");
    console.log("Columns:");
    columns.forEach(col => {
      console.log(`  - ${col.COLUMN_NAME} (${col.DATA_TYPE}) ${col.COLUMN_KEY ? `[${col.COLUMN_KEY}]` : ''} ${col.EXTRA || ''}`);
    });
    
    // Check if there's any data
    const [rows] = await db.query("SELECT * FROM cosmeticluxdb.users LIMIT 5");
    console.log(`\n📊 Total rows found: ${rows.length}`);
    if (rows.length > 0) {
      console.log("Sample data:");
      rows.forEach((row, idx) => {
        console.log(`  Row ${idx + 1}:`, JSON.stringify(row, null, 2));
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

checkSchema();
