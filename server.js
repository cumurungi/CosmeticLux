// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./auth.js"; // Fixed path for flat structure

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Public route
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
