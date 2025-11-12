// backend/routes/auth.js
import express from "express";
import { loginController } from "../controllers/authController.js"; // make sure path is correct

const router = express.Router();

// Login route
router.post("/", loginController);

export default router;

