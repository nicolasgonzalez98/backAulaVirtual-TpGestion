const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.controller');

router.post("/", cursoController.crearCurso);

router.get("/", cursoController.obtenerCursos);

router.get("/:id", cursoController.obtenerCursoPorId);

router.put("/:id", cursoController.actualizarCurso);

router.delete("/:id", cursoController.eliminarCurso);

router.get("/establecimiento/:establecimientoId", cursoController.obtenerCursosPorEstablecimiento);

router.get("/buscar", cursoController.buscarCursosByNameOrCode);

router.post('/:cursoId/alumnos/:alumnoId', cursoController.vincularAlumno);

router.delete('/:cursoId/alumnos/:alumnoId', cursoController.desvincularAlumno);

router.get('/alumno/:alumnoId', cursoController.obtenerCursosPorAlumno);


module.exports = router;