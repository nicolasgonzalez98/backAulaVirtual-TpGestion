import { Curso } from "../models/curso.model";

// Crear un curso
export const crearCurso = async (data) => {
  const curso = new Curso(data);
  return await curso.save();
};

// Obtener todos los cursos
export const obtenerCursos = async () => {
  return await Curso.find().populate('establecimiento_id');
};

// Obtener curso por ID
export const obtenerCursoPorId = async (id) => {
  return await Curso.findById(id).populate('establecimiento_id');
};

// Actualizar curso
export const actualizarCurso = async (id, data) => {
  return await Curso.findByIdAndUpdate(id, data, { new: true });
};

// Eliminar curso
export const eliminarCurso = async (id) => {
  return await Curso.findByIdAndDelete(id);
};

// Obtener cursos por establecimiento
export const obtenerCursosPorEstablecimiento = async (establecimientoId) => {
  return await Curso.find({ establecimiento_id: establecimientoId }).populate('establecimiento_id');
};

// Buscar cursos por nombre o código
export const buscarCursosByNameOrCode = async (query) => {
  return await Curso.find({ $or: [
    { nombre: new RegExp(query, 'i') },
    { codigo: new RegExp(query, 'i') }
  ]}).populate('establecimiento_id');
}

export default {
    crearCurso,
    obtenerCursos,
    obtenerCursoPorId,
    actualizarCurso,
    eliminarCurso,
    obtenerCursosPorEstablecimiento,
    buscarCursosByNameOrCode
};