const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;
  const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }

  const hashedPassword = await captainModel.hashPassword(password);

  try {
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    // Generate auth token
    const token = captain.generateAuthToken();

  

    res.status(201).json({ captain });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Generate auth token
    const token = captain.generateAuthToken();
      
      res.cookie("token", token);

    res.status(200).json({ token, captain });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });

    const token = req.cookies?.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Insert token into blacklist, ignoring duplicate errors
    try {
      await blacklistTokenModel.create({ token });
    } catch (error) {
      if (error.code === 11000) {
        // Ignore duplicate error
      } else {
        throw error; // Only throw if it's not a duplicate error
      }
    }

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
