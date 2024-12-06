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

app.options('*', cors());
app.use(bodyParser.json());

const corsOptions = {
    origin: ['https://password-manager-qaiv.vercel.app/', 'http://localhost:5001'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
};

app.use(cors({
    origin: '*'
}))

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
