// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

module.exports = async (req, res, next) => {
  try {

    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded:', decoded);
    const usuario = await Usuario.findById(decoded._id);
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = usuario; // 👈 lo guardamos para usarlo en el controller
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
