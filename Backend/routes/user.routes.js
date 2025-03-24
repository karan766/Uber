const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
   
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
], userController.loginUser);

module.exports = router;
