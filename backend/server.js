const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const passwordRoutes = require('./src/routes/passwordRoutes');
const cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config();

connectDB();

const app = express();



app.use(bodyParser.json());

// Allow CORS for specific origin
app.use(cors({
    origin: 'https://password-manager-qaiv.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://password-manager-qaiv.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200); // Send HTTP 200 for preflight
});


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));