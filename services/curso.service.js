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

  async registrarAsistencia(cursoId, userId) {
    // Verificar si el usuario pertenece al curso
    const curso = await cursoRepository.obtenerPorId(cursoId);

    if (!curso) {
      throw new Error('Curso no encontrado');
    }

    const estaInscripto = curso.alumnos.some(alumnoId => alumnoId.equals(userId));
    if (!estaInscripto) {
      throw new Error('El usuario no está inscripto en este curso');
    }

    // Buscar si ya hay una asistencia registrada hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const asistenciaExistente = await asistenciaRepository.buscarPorCursoYAlumno(cursoId, userId, hoy);

    if (asistenciaExistente) {
      asistenciaExistente.estado = 'presente';
      asistenciaExistente.hora_registro = new Date();
      return await asistenciaExistente.save();
    }

    // Crear nueva asistencia
    const nuevaAsistencia = await asistenciaRepository.crear({
      clase: null, // opcional, depende de tu lógica
      alumno: userId,
      estado: 'presente',
      metodo_registro: 'manual'
    });

    return nuevaAsistencia;
  }
}
module.exports = new CursoService();