
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const authUser = require("../middlewares/auth.middleware");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { fullname, email, password } = req.body;

  // Check if the user already exists
  const isUserAlreadyExists = await userModel.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  try {
   
    // Create the user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate auth token
    const token = user.generateAuthToken();

    // Return success response with token and user
    res.status(201).json({ token, user });

  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ error: "An error occurred while registering the user" });
  }
};


module.exports.loginUser = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');
  
  
  
  if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = user.generateAuthToken();
  
  res.cookie('token', token);

  res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {
 
   res.status(200).json( req.user );
}

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');

  const token = req.cookies.token || req.headers.authorization.split(' ')[1];

  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: 'Logout successful' });
}
