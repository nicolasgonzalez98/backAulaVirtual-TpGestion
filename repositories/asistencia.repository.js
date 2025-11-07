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

  async buscarPorCursoYAlumno(cursoId, alumnoId, fecha) {
    // Buscar clases del curso en la fecha actual
    const clase = await Clase.findOne({
      curso: cursoId,
      fecha: { $gte: fecha, $lt: new Date(fecha.getTime() + 24 * 60 * 60 * 1000) }
    });

    if (!clase) return null;

    return await Asistencia.findOne({
      clase: clase._id,
      alumno: alumnoId
    });
  }
}

module.exports = new AsistenciaRepository();
