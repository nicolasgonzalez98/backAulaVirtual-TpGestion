import Asistencia from "../models/asistencia.model.js";

// Crear asistencia
export const crearAsistencia = async (data) => {
  const asistencia = new Asistencia(data);
  return await asistencia.save();
};

// Obtener todas las asistencias
export const obtenerAsistencias = async () => {
  return await Asistencia.find().populate('clase').populate('alumno');
};

// Obtener asistencia por ID
export const obtenerAsistenciaPorId = async (id) => {
  return await Asistencia.findById(id).populate('clase').populate('alumno');
};

// Actualizar asistencia
export const actualizarAsistencia = async (id, data) => {
  return await Asistencia.findByIdAndUpdate(id, data, { new: true });
};

// Eliminar asistencia
export const eliminarAsistencia = async (id) => {
  return await Asistencia.findByIdAndDelete(id);
};

// Obtener asistencias por alumno
export const obtenerAsistenciasPorAlumno = async (alumnoId) => {
  return await Asistencia.find({ alumno: alumnoId }).populate('clase').populate('alumno');
};

// Obtener asistencias por clase
export const obtenerAsistenciasPorClase = async (claseId) => {
  return await Asistencia.find({ clase: claseId }).populate('clase').populate('alumno');
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