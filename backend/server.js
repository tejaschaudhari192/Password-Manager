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

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', 'http://local:5000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Api-Key'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
  });
  

const corsOptions = {
    origin: 'http://localhost:5000', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

app.use('*',cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/passwords', passwordsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));