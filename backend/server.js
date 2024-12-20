const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const passwordRoutes = require('./src/routes/passwordRoutes');
const cors = require('cors')
const bodyParser = require("body-parser");
dotenv.config();
connectDB();

const app = express();

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    next();
});



app.use(bodyParser.json());

const corsOptions = {
    origin: ['https://password-manager-qaiv.vercel.app/', 'http://localhost:5001'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions))

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://password-manager-qaiv.vercel.app'); // Frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end(); // End the preflight response
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
