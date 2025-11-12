// src/connection.js
import mysql from "mysql2"; // <-- use promise version
import dotenv from "dotenv";
dotenv.config();

const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}).promise();
db.getConnection()
  .then(() => console.log("✅ Connected to database:", process.env.DB_NAME))
  .catch(err => console.error("❌ DB connection error:", err));


export default db;
