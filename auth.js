// backend/routes/auth.js
import express from "express";
import { loginController } from "./AuthController.js"; // Fixed path for flat structure

const router = express.Router();

// Login route
router.post("/", loginController);

export default router;

