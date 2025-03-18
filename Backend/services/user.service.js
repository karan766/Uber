const User = require('../models/user.model');

module.exports.createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};
