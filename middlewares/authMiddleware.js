const jwt = require("jsonwebtoken");

const protectRoute =(role="patient")=> (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    token = token.split(" ")[1]; // Remove "Bearer "
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const jwtRole = req.user.role;
    if(!['all',jwtRole].includes(role)){
        return res.status(401).json({ message: "Unauthorized: Access denied" });
    }
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = protectRoute;
