import asistenciaRepository from "../repositories/asistencia.repository.js";

// Crear asistencia
export const crearAsistencia = async (data) => {
  const asistenciaExistente = await asistenciaRepository.obtenerAsistenciasPorAlumno(data.alumno);
  const yaRegistrada = asistenciaExistente.some(a => 
    a.clase.toString() === data.clase.toString()
  );
  if (yaRegistrada) {
    throw new Error("La asistencia para este alumno y clase ya existe.");
  }
  return await asistenciaRepository.crearAsistencia(data);
};

// Obtener todas las asistencias
export const obtenerAsistencias = async () => {
  return await asistenciaRepository.obtenerAsistencias();
};

// Obtener asistencia por ID
export const obtenerAsistenciaPorId = async (id) => {
  return await asistenciaRepository.obtenerAsistenciaPorId(id);
};

// Actualizar asistencia
export const actualizarAsistencia = async (id, data) => {
  return await asistenciaRepository.actualizarAsistencia(id, data);
};

// Eliminar asistencia
export const eliminarAsistencia = async (id) => {
  return await asistenciaRepository.eliminarAsistencia(id);
};

// Obtener asistencias por alumno
export const obtenerAsistenciasPorAlumno = async (alumnoId) => {
  return await asistenciaRepository.obtenerAsistenciasPorAlumno(alumnoId);
};

// Obtener asistencias por clase
export const obtenerAsistenciasPorClase = async (claseId) => {
  return await asistenciaRepository.obtenerAsistenciasPorClase(claseId);
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