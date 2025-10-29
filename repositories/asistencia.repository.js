const Asistencia = require('../models/asistencia.model');

class AsistenciaRepository {
  async crear(data) {
    const asistencia = new Asistencia(data);
    return await asistencia.save();
  }

  async obtenerTodos() {
    return await Asistencia.find()
      .populate('clase')
      .populate('alumno');
  }

  async obtenerPorId(id) {
    return await Asistencia.findById(id)
      .populate('clase')
      .populate('alumno');
  }

  async actualizar(id, data) {
    return await Asistencia.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return await Asistencia.findByIdAndDelete(id);
  }

  async obtenerPorClase(idClase) {
    return await Asistencia.find({ clase: idClase })
      .populate('alumno')
      .populate('clase');
  }

  async obtenerPorAlumno(idAlumno) {
    return await Asistencia.find({ alumno: idAlumno })
      .populate('clase')
      .populate('alumno');
  }
}

module.exports = new AsistenciaRepository();
