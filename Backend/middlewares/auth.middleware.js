const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");




module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
        }

        // Verify Token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token:", decodedToken);

        // Check if user exists
        const user = await userModel.findById(decodedToken._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};



module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
    // Temporary debug: Log the token (remove in production)
    if (!token) {
      // You might want to handle this silently in production
      console.warn("No token provided in request.");
      return res.status(401).json({ message: "Unauthorized" });
    }
    
  
    // Check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      console.warn("Token is blacklisted.");
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
      const captain = await captainModel.findById(decodedToken._id);
      if (!captain) {
        console.warn("Captain not found for id:", decodedToken._id);
        return res.status(401).json({ message: "Captain not found" });
      }
      req.captain = captain;
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
  