const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.controller');

router.post("/", cursoController.crearCurso);
router.get("/", cursoController.obtenerCursos);

// RUTAS ESPECÍFICAS PRIMERO (antes de /:id)
router.get("/buscar", cursoController.buscarCursosByNameOrCode);
router.get("/establecimiento/:establecimientoId", cursoController.obtenerCursosPorEstablecimiento);
router.get('/alumno/:alumnoId', cursoController.obtenerCursosPorAlumno);

// RUTAS CON :id AL FINAL
router.get("/:id", cursoController.obtenerCursoPorId);
router.put("/:id", cursoController.actualizarCurso);
router.delete("/:id", cursoController.eliminarCurso);

// Rutas de alumnos
router.post('/:cursoId/alumnos/:alumnoId', cursoController.vincularAlumno);
router.delete('/:cursoId/alumnos/:alumnoId', cursoController.desvincularAlumno);

module.exports = router;
