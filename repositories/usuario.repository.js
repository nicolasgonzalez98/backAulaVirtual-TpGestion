const Usuario = require('../models/usuario.model');

// Crear usuario
const createUser = async (userData) => {
  const user = new Usuario(userData);
  return await user.save();
};

// Buscar por email
const findUserByEmail = async (email) => {
  return await Usuario.findOne({ email });
};

// Buscar por ID (sin password)
const findUserById = async (id) => {
  return await Usuario.findById(id);
};

// Obtener todos los usuarios
const findAllUsers = async () => {
  return await Usuario.find().select('-password');
};

// Actualizar usuario
const updateUser = async (id, data) => {
  return await Usuario.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  }).select('-password');
};

// Eliminar usuario
const deleteUser = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};

// Activar / desactivar usuario (toggle)
const toggleUserStatus = async (id) => {
  const user = await Usuario.findById(id);
  if (!user) return null;

  user.active = !user.active;
  await user.save();

  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
  toggleUserStatus
};

