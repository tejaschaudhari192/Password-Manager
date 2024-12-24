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

const corsOptions = {
    origin: ['*'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['*'],
    credentials: true,
};

app.options('*', cors()); // Handle preflight requests


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));