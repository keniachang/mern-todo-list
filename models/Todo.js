const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please include a title for the todo']
    },
    description: String,
    date: Date,
    time: String
});

module.exports = TodoSchema;
