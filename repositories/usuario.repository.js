import Usuario from '../models/usuario.model.js';

export const createUser = async (userData) => {
  const user = new Usuario(userData);
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await Usuario.findOne({ email });
};

export const findUserById = async (id) => {
  return await Usuario.findById(id);
};