const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/clase/:idClase', asistenciaController.obtenerPorClase);
router.get('/alumno/:idAlumno', asistenciaController.obtenerPorAlumno);
router.get('/:id', asistenciaController.obtenerPorId);
router.put('/:id', asistenciaController.actualizar);
router.delete('/:id', asistenciaController.eliminar);
router.post('/', asistenciaController.crear);
router.get('/', asistenciaController.listar);
router.post('/cursos/:cursoId/:claseId/asistencia', authMiddleware, asistenciaController.registrarAsistencia.bind(asistenciaController));

module.exports = router;
