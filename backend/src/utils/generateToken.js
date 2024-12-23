const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id, user) => {
  return jwt.sign({ id: id, username: user.username }, "" + process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;
