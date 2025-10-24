const claseRepository = require('../repositories/clase.repository');
const usuarioRepository = require('../repositories/usuario.repository');

class ClaseService {
  async crearClase(data) {
    // Acá podrías generar un QR único, por ejemplo
    if (!data.qr_code) {
      data.qr_code = `QR-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    }
    return await claseRepository.crear(data);
  }

  async listarClases() {
    return await claseRepository.obtenerTodos();
  }

  async obtenerClase(id) {
    return await claseRepository.obtenerPorId(id);
  }

  async actualizarClase(id, data) {
    return await claseRepository.actualizar(id, data);
  }

  async eliminarClase(id) {
    return await claseRepository.eliminar(id);
  }

  async listarPorCurso(idCurso) {
    return await claseRepository.obtenerPorCurso(idCurso);
  }

  async listarPorRangoFechas(desde, hasta) {
    const fechaInicio = new Date(desde);
    const fechaFin = new Date(hasta);
    fechaFin.setUTCHours(23, 59, 59, 999);
    return await claseRepository.obtenerPorRangoFechas(fechaInicio, fechaFin);
  }
}

module.exports = new ClaseService();
