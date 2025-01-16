const express = require('express');
const { getPasswords, createPassword, updatePassword, deletePassword } = require('../controllers/passwordController');
const protect = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').
    get(verifyToken, protect, getPasswords).
    post(verifyToken, protect, createPassword).
    put(verifyToken, protect, updatePassword).
    delete(verifyToken, protect, deletePassword)


module.exports = router;
