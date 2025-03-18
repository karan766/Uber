


const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res, next) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt.hash to hash the password

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
