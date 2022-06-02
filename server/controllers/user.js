const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const generateToken = require('../token/generateToken.js');
const asyncHandler = require('express-async-handler');

// Mail sending controller
dotenv.config();
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
    service: EMAIL_PROVIDER,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
});

// Register
exports.register = asyncHandler (async(req, res, next) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(402).json({ errorMessage: "This email has already been registered"})
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    })
        
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
        const mailOptions = {
            from: 'Biker Club Store',
            to: email,
            subject: 'Sign up successful!',
            text: 'Welcome to Biker Club!',
            html: '<div><h1>Welcome to Biker Club!</h1><h2>You have been successfully registered.</div>'
        };
            
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
});

// Login
exports.login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else{ 
        res.status(401).json({ errorMessage: "Please verify your username or password.", email: email});
        throw new Error("Invalid email or password.");
    }
});

exports.getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// Update user's profile
exports.updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

// Update user from admin's settings
exports.updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin            
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

exports.getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.json(users);
});

exports.deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        await user.remove();
        res.json({ message: "User removed" })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});