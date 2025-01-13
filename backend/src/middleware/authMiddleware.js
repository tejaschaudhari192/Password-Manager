const jwt = require('jsonwebtoken')
require('dotenv').config();

const SECRET = "" + process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1];
  console.log(token);


  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        console.log("Failed to verify token")
        return res.status(403).json({ message: 'Failed to authenticate token', success: false });
      }

      console.log(decoded);  // Log decoded token to see its contents
      req.userId = decoded;  // Assuming the token contains user info like id
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Token is not valid', success: false });


  }
};

module.exports = verifyToken