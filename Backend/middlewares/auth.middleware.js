const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {   
    const token =req.cookies.token || req.headers.authorization?.split(" ")[1]; 
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
   
     const isBlacklisted = await userModel.findOne( { token });
     if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
     
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decodedToken._id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        return  next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token =req.cookies.token || req.headers.authorization?.split(" ")[1]; 
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
   
     const isBlacklisted = await blacklistTokenModel.findOne( { token });
     if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
     
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const captain = await captainModel.findById(decodedToken._id);
        if (!captain) {
            return res.status(401).json({ message: "Captain not found" });
        }
        req.captain = captain;
        return  next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}