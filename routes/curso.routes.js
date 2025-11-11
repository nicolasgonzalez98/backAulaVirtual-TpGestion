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

module.exports = router;