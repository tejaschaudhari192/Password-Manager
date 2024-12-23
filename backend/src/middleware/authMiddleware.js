const jwt = require('jsonwebtoken')
require('dotenv').config();

const SECRET = "" + process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1];
  // console.log(token);


  try {
    const decoded = jwt.verify(token, SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {

    // console.log(error);

    return res.status(401).json({ msg: 'Token is not valid' });

  }
};

module.exports = verifyToken