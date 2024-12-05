const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const passwordRoutes = require('./src/routes/passwordRoutes');
const cors = require('cors')
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.options('*', cors());

app.use((req, res) => {
    console.log(`Request Method: ${req.method}, URL: ${req.url}`);
});


// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
//     credentials:true
// }))

app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
