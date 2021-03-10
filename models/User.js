const mongoose = require('mongoose');
const TodoSchema = require('./Todo');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please include your name']
    },
    email: {
        type: String,
        required: [true, 'Please include your email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please include your password']
    },
    todos: {
        type: [TodoSchema],
        default: []
    }
});

module.exports = mongoose.model('User', UserSchema);
