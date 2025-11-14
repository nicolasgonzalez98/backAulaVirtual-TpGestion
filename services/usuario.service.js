const bcrypt = require('bcrypt');
const userRepository = require('../repositories/usuario.repository');

// Crear usuario
const createUser = async (data) => {
  // en el formulario NO llega el password → generamos uno temporal -> es el DNI
  const tempPassword = data.dni ? data.dni : '123456';

  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const userData = {
    ...data,
    password: hashedPassword
  };

  return await userRepository.createUser(userData);
};

// Obtener todos los usuarios
const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

// Obtener usuario por ID
const getUserById = async (id) => {
  return await userRepository.findUserById(id);
};

// Actualizar usuario
const updateUser = async (id, data) => {
  // Si llega password NO lo permitimos actualizar desde acá
  if (data.password) delete data.password;

  return await userRepository.updateUser(id, data);
};

// Eliminar usuario
const deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};

// Activar / desactivar usuario
const toggleUserStatus = async (id) => {
  return await userRepository.toggleUserStatus(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus
};
