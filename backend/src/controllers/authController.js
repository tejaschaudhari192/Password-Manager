const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt')
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;


  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id, user),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.errmsg });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, user),
      });
    } else {
      if (!user) return res.status(404).json({ message: "Email not found" });
      return res.status(401).json({ message: 'Wrong Password' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  console.log("from server verify token");
  return res.json({ message: 'Verify token', success: true });
  // If token is present decode it

}
