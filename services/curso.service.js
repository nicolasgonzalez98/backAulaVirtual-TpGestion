const cursoRepository = require('../repositories/curso.repository');

class CursoService {
  // Crear un curso
  async crearCurso(data) {
    return await cursoRepository.crearCurso(data);
  };

  // Obtener todos los cursos
  async obtenerCursos() {
    return await cursoRepository.obtenerCursos();
  };

  // Obtener curso por ID
  async obtenerCursoPorId(id) {
    return await cursoRepository.obtenerCursoPorId(id);
  };

  // Actualizar curso
  async actualizarCurso(id, data) {
    return await cursoRepository.actualizarCurso(id, data);
  };

  // Eliminar curso
  async eliminarCurso(id) {
    return await cursoRepository.eliminarCurso(id);
  };

  // Obtener cursos por establecimiento
  async obtenerCursosPorEstablecimiento(establecimientoId) {
    return await cursoRepository.obtenerCursosPorEstablecimiento(establecimientoId);
  };

  // Buscar cursos por nombre o código
  async buscarCursosByNameOrCode(query) {
    return await cursoRepository.buscarCursosByNameOrCode(query);
  };

}
module.exports = new CursoService();