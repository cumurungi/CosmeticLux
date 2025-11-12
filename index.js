// backend/models/index.js
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import UserModel from "./User.js";

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  }
);

// Initialize models
const User = UserModel(sequelize, DataTypes);

// Export models and sequelize instance
export { sequelize, User };
