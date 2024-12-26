const express = require('express');
const { setFavorite, getPassword } = require('../controllers/passwordController');
const protect = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').
    get(verifyToken, getPassword).
    post(verifyToken,setFavorite)

module.exports = router;
