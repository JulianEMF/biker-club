const express = require('express');
const { check, body } = require('express-validator');
const { protect, admin } = require('../middleware/authMiddleware.js');
const { register, login, getUserById, updateUserProfile, getUsers, deleteUser } = require('../controllers/user');
const User = require('../models/User');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/getusers', protect, admin, getUsers);

router.put('/profile', protect, updateUserProfile);

router.delete('/deleteuser/:id', protect, admin, deleteUser);

router.get('/:id', getUserById); 

module.exports = router;