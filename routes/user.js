const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**
 * @desc    Register
 * @route   POST /api/users/register
 * @access  Public
 */
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please enter all fields' });
    }

    try {
        const users = await User.find().select('-password');
        if (users.length > 4)
            throw Error('The number of users has reached the limit');

        const user = await User.findOne({ email });
        if (user) throw Error("User's email already exists");

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error('Something went wrong hashing the password');

        const newUser = {
            name,
            email,
            password: hash
        };

        const userRegister = await User.create(newUser);
        if (!userRegister) throw Error('Something went wrong registering');

        const token = jwt.sign(
            { id: userRegister._id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 }
        );

        res.status(201).json({
            token,
            data: {
                id: userRegister._id,
                name: userRegister.name,
                email: userRegister.email,
                todos: userRegister.todos
            }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @desc    Get the number of users
 * @route   GET /api/users/
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.status(201).json({ count: users.length });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
