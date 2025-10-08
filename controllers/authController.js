const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};