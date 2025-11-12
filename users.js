// backend/routes/users.js
import express from "express";
import { User } from "../models/index.js"; // adjust if your models are in models/index.js

const router = express.Router();

// Protected route: GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "username"] });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
