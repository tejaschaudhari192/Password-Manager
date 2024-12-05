const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  // console.log(token);


  if (token && token.startsWith('Bearer')) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized, no token provided' });
  }
};

module.exports = protect;