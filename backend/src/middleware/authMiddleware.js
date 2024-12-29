const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Replace with the correct path to your User model

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from the `Authorization` header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = { id: decoded.id }; // Attach the user's ID to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};



module.exports = authenticateToken;
