const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const authorize = require('../middlewares/authorize');

/**
 * @desc    Login
 * @route   POST /api/auth/login
 * @access  Public
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) throw Error('User does not exist');

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) throw Error('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 3600
        });

        res.status(200).json({
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                todos: user.todos
            }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @desc    Get user's data
 * @route   GET /api/auth/user
 * @access  Private
 */
router.get('/user', authorize, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) throw Error('User does not exist');

        res.status(200).json({ data: user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @desc    Get todos of user
 * @route   GET /api/auth/user/todos
 * @access  Private
 */
router.get('/user/todos', authorize, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) throw Error('User does not exist');

        res.status(200).json({ data: user.todos });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @desc    Add a todo to user's todo list
 * @route   POST /api/auth/user/todos
 * @access  Private
 */
router.post('/user/todos', authorize, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) throw Error('User does not exist');

        if (user.todos.length >= 10) {
            throw Error('The number of todo items has reached the limit');
        }

        const { title } = req.body;
        if (!title) {
            return res
                .status(400)
                .json({ error: 'Please include a title for the todo' });
        }

        user.todos.push(req.body);
        await user.save();

        const index = user.todos.length - 1;
        const todo = user.todos[index];

        res.status(201).json({ data: todo });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @desc    Update a todo of the user
 * @route   POST /api/auth/user/todos/:id
 * @access  Private
 */
router.post('/user/todos/:id', authorize, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) throw Error('User does not exist');

        const todo = await user.todos.id(req.params.id);
        if (!todo) throw Error('Todo item does not exist');

        await todo.set(req.body);
        await user.save();

        res.status(200).json({ data: todo });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @desc    Delete a todo of the user
 * @route   DELETE /api/auth/user/todos/:id
 * @access  Private
 */
router.delete('/user/todos/:id', authorize, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) throw Error('User does not exist');

        await user.todos.id(req.params.id).remove();
        await user.save();

        res.status(200).json({});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
