const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async ({ username, password, role = 'customer' }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashedPassword, role });
};

exports.loginUser = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials');
  }
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};