const express = require('express');
const { getPasswords, createPassword, updatePassword, deletePassword } = require('../controllers/passwordController');
const protect = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').
    get(verifyToken, getPasswords).
    post(verifyToken, createPassword).
    put(verifyToken, updatePassword).
    delete(verifyToken, deletePassword)


module.exports = router;
