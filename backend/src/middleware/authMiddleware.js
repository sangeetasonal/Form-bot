const jwt = require("jsonwebtoken");

// Middleware function to protect routes
const protect = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];  // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request (for later use in route handlers)
    req.user = decoded.id;  // You can add more user information if needed, like username or email
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
