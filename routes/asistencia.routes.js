import { Router } from "express";
import asistenciaController from "../controllers/asistencia.controller.js";

const router = Router();

// Crear asistencia
router.post("/", asistenciaController.crearAsistencia);

// Obtener todas las asistencias
router.get("/", asistenciaController.obtenerAsistencias);

// Obtener asistencia por ID
router.get("/:id", asistenciaController.obtenerAsistenciaPorId);

// Actualizar asistencia
router.put("/:id", asistenciaController.actualizarAsistencia);

// Eliminar asistencia
router.delete("/:id", asistenciaController.eliminarAsistencia);

// Obtener asistencias por alumno
router.get("/alumno/:alumnoId", asistenciaController.obtenerAsistenciasPorAlumno);

// Obtener asistencias por clase
router.get("/clase/:claseId", asistenciaController.obtenerAsistenciasPorClase);

export default router;