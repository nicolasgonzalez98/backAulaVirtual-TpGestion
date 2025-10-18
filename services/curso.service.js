import cursoRepository from "../repositories/curso.repository.js";

// Crear un curso
export const crearCurso = async (data) => {
  return await cursoRepository.crearCurso(data);
};

// Obtener todos los cursos
export const obtenerCursos = async () => {
  return await cursoRepository.obtenerCursos();
};

// Obtener curso por ID
export const obtenerCursoPorId = async (id) => {
  return await cursoRepository.obtenerCursoPorId(id);
};

// Actualizar curso
export const actualizarCurso = async (id, data) => {
  return await cursoRepository.actualizarCurso(id, data);
};

// Eliminar curso
export const eliminarCurso = async (id) => {
  return await cursoRepository.eliminarCurso(id);
};

// Obtener cursos por establecimiento
export const obtenerCursosPorEstablecimiento = async (establecimientoId) => {
  return await cursoRepository.obtenerCursosPorEstablecimiento(establecimientoId);
};

// Buscar cursos por nombre o código
export const buscarCursosByNameOrCode = async (query) => {
  return await cursoRepository.buscarCursosByNameOrCode(query);
};

export default {
  crearCurso,
  obtenerCursos,
  obtenerCursoPorId,
  actualizarCurso,
  eliminarCurso,
  obtenerCursosPorEstablecimiento,
  buscarCursosByNameOrCode
};