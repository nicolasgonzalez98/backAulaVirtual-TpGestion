const Usuario = require('../models/usuario.model');

const createUser = async (userData) => {
  const user = new Usuario(userData);
  return await user.save();
};

const findUserByEmail = async (email) => {
  return await Usuario.findOne({ email });
};

const findUserById = async (id) => {
  return await Usuario.findById(id);
};

module.exports = { createUser, findUserByEmail, findUserById };
