const express = require('express');
const { getPasswords, createPassword, updatePassword, deletePassword } = require('../controllers/passwordController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').
    get(protect, getPasswords).
    post(protect, createPassword).
    put(protect, updatePassword).
    delete(protect, deletePassword)


module.exports = router;
