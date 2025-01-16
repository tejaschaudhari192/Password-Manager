const express = require('express');
const { setFavorite, getPassword } = require('../controllers/passwordController');
const protect = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').
    get(verifyToken, protect, getPassword).
    post(verifyToken, protect, setFavorite)

module.exports = router;
