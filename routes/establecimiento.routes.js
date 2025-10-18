const express = require('express');
const router = express.Router();
const establecimientoController = require('../controllers/establecimientoController');

// Crear un nuevo establecimiento
router.post('/', establecimientoController.crear);

// Listar todos
router.get('/', establecimientoController.listar);

// Obtener por ID
router.get('/:id', establecimientoController.obtenerPorId);

// Actualizar
router.put('/:id', establecimientoController.actualizar);

// Eliminar
router.delete('/:id', establecimientoController.eliminar);

module.exports = router;
