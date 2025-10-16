import cursoService from "../services/curso.service.js";

// Crear un curso
export const crearCurso = async (req, res) => {
  try {
    const curso = await cursoService.crearCurso(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los cursos
export const obtenerCursos = async (req, res) => {
  try {
    const cursos = await cursoService.obtenerCursos();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener curso por ID
export const obtenerCursoPorId = async (req, res) => {
  try {
    const curso = await cursoService.obtenerCursoPorId(req.params.id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar curso
export const actualizarCurso = async (req, res) => {
  try {
    const curso = await cursoService.actualizarCurso(req.params.id, req.body);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    res.status(200).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar curso
export const eliminarCurso = async (req, res) => {
  try {
    const curso = await cursoService.eliminarCurso(req.params.id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener cursos por establecimiento
export const obtenerCursosPorEstablecimiento = async (req, res) => {
  try {
    const cursos = await cursoService.obtenerCursosPorEstablecimiento(req.params.establecimientoId);
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar cursos por nombre o código
export const buscarCursosByNameOrCode = async (req, res) => {
  try {
    const cursos = await cursoService.buscarCursosByNameOrCode(req.query.q);
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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