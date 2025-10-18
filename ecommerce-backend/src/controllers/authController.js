const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};