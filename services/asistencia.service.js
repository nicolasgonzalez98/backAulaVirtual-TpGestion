const asistenciaRepository = require('../repositories/asistencia.repository');

class AsistenciaService {
  async crearAsistencia(data) {
    return await asistenciaRepository.crear(data);
  }

  async listarAsistencias() {
    return await asistenciaRepository.obtenerTodos();
  }

  async obtenerAsistencia(id) {
    return await asistenciaRepository.obtenerPorId(id);
  }

  async actualizarAsistencia(id, data) {
    return await asistenciaRepository.actualizar(id, data);
  }

  async eliminarAsistencia(id) {
    return await asistenciaRepository.eliminar(id);
  }

  async obtenerAsistenciasPorClase(idClase) {
    return await asistenciaRepository.obtenerPorClase(idClase);
  }

  async obtenerAsistenciasPorAlumno(idAlumno) {
    return await asistenciaRepository.obtenerPorAlumno(idAlumno);
  }
}

module.exports = new AsistenciaService();
