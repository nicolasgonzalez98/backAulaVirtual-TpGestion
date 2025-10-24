const Clase = require('../models/clase.model');

class ClaseRepository {
  async crear(data) {
    const clase = new Clase(data);
    return await clase.save();
  }

  async obtenerTodos() {
    return await Clase.find()
      .populate('curso')
      .populate('docentes');
  }

  async obtenerPorId(id) {
    return await Clase.findById(id)
      .populate('curso')
      .populate('docentes');
  }

  async actualizar(id, data) {
    return await Clase.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return await Clase.findByIdAndDelete(id);
  }

  // Ejemplo: obtener clases por curso
  async obtenerPorCurso(idCurso) {
    return await Clase.find({ curso: idCurso })
      .populate('curso')
      .populate('docentes');
  }

  // Ejemplo: obtener clases por rango de fechas
  async obtenerPorRangoFechas(desde, hasta) {
    // console.log("Filtro fechas:", new Date(desde), new Date(hasta));
    return await Clase.find({
      fecha: { $gte: new Date(desde), $lte: new Date(hasta) }
    }).populate('curso');
  }
}

module.exports = new ClaseRepository();
