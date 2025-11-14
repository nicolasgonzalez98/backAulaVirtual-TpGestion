const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');

router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

// Rutas especiales necesarias por Angular
router.patch('/:id/toggle-status', controller.toggleUserStatus);
router.patch('/:id/role', controller.changeUserRole);

module.exports = router;