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

app.use(cors({
    origin: ['http://localhost:5000']
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/passwords', passwordsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));