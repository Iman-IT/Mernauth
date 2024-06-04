const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const Userlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UserSignup = async (req, res) => {
  const { name, email, password, occupation, registrationNo, semester, designation, qualification } = req.body;
  console.log(req.body);

  try {
    const user = await User.signup(name, email, password, occupation, registrationNo, semester, designation, qualification);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  Userlogin,
  UserSignup
};
