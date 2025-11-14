const userService = require('../services/usuario.service');

// GET /api/usuarios
const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// GET /api/usuarios/:id
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// POST /api/usuarios
const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear el usuario' });
  }
};

// PUT /api/usuarios/:id
const updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar el usuario' });
  }
};

// DELETE /api/usuarios/:id
const deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar el usuario' });
  }
};

// PATCH /api/usuarios/:id/toggle
const toggleUserStatus = async (req, res) => {
  try {
    const user = await userService.toggleUserStatus(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({
      message: 'Estado actualizado correctamente',
      user
    });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar el estado' });
  }
};

const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await userService.updateUser(req.params.id, { rol: role });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({
      message: 'Rol actualizado correctamente',
      user
    });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar el rol' });
  }
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  changeUserRole
};
