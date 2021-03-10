const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const users = require('./routes/user');
const auth = require('./routes/auth');
const path = require('path');

// App Config
const app = express();

// Middlewares
app.use(express.json());

// DB Config
connectDB();

// API Endpoints
// app.get('/', (req, res) => res.status(200).send('Hello World!'));
app.use('/api/users', users);
app.use('/api/auth', auth);

// Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

// Listener
PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
