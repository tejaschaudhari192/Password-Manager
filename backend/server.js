const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const passwordRoutes = require('./src/routes/passwordRoute');
const passwordsRoutes = require('./src/routes/passwordsRoutes');
const cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config();

connectDB();

const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:5000', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

app.use('*',cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/passwords', passwordsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));