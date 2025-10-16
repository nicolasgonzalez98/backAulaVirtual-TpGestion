import asistenciaService from "../services/Asistencia.service.js";

// Crear asistencia
export const crearAsistencia = async (req, res) => {
  try {
    const asistencia = await asistenciaService.crearAsistencia(req.body);
    res.status(201).json(asistencia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las asistencias
export const obtenerAsistencias = async (req, res) => {
  try {
    const asistencias = await asistenciaService.obtenerAsistencias();
    res.status(200).json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener asistencia por ID
export const obtenerAsistenciaPorId = async (req, res) => {
  try {
    const asistencia = await asistenciaService.obtenerAsistenciaPorId(req.params.id);
    if (!asistencia) return res.status(404).json({ error: "Asistencia no encontrada" });
    res.status(200).json(asistencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar asistencia
export const actualizarAsistencia = async (req, res) => {
  try {
    const asistencia = await asistenciaService.actualizarAsistencia(req.params.id, req.body);
    if (!asistencia) return res.status(404).json({ error: "Asistencia no encontrada" });
    res.status(200).json(asistencia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar asistencia
export const eliminarAsistencia = async (req, res) => {
  try {
    const asistencia = await asistenciaService.eliminarAsistencia(req.params.id);
    if (!asistencia) return res.status(404).json({ error: "Asistencia no encontrada" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener asistencias por alumno
export const obtenerAsistenciasPorAlumno = async (req, res) => {
  try {
    const asistencias = await asistenciaService.obtenerAsistenciasPorAlumno(req.params.alumnoId);
    res.status(200).json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener asistencias por clase
export const obtenerAsistenciasPorClase = async (req, res) => {
  try {
    const asistencias = await asistenciaService.obtenerAsistenciasPorClase(req.params.claseId);
    res.status(200).json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  crearAsistencia,
  obtenerAsistencias,
  obtenerAsistenciaPorId,
  actualizarAsistencia,
  eliminarAsistencia,
  obtenerAsistenciasPorAlumno,
  obtenerAsistenciasPorClase
};