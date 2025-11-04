const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.controller');

// Crear un curso
router.post("/", cursoController.crearCurso);

// Obtener todos los cursos
router.get("/", cursoController.obtenerCursos);

// Obtener curso por ID
router.get("/:id", cursoController.obtenerCursoPorId);

// Actualizar curso
router.put("/:id", cursoController.actualizarCurso);

// Eliminar curso
router.delete("/:id", cursoController.eliminarCurso);

// Obtener cursos por establecimiento
router.get("/establecimiento/:establecimientoId", cursoController.obtenerCursosPorEstablecimiento);

// Buscar cursos por nombre o código
router.get("/buscar", cursoController.buscarCursosByNameOrCode);

module.exports = router;