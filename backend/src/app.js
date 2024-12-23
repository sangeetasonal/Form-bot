const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cors({ origin: "http://localhost:3000" })); // Adjust to match your frontend URL

// Routes
app.use("/api/auth", authRoutes);  // This handles routes like /register and /login defined in authRoutes.js

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

module.exports = app;
