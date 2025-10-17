const Establecimiento = require('../models/establecimiento.model');

class EstablecimientoRepository {
  async crear(data) {
    return await Establecimiento.create(data);
  }

  async obtenerTodos() {
    return await Establecimiento.find().populate('cursos','responsable', 'nombre email');
  }

  async obtenerPorId(id) {
    return await Establecimiento.findById(id).populate('cursos', 'responsable', 'nombre email');
  }

  async actualizar(id, data) {
    return await Establecimiento.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return await Establecimiento.findByIdAndDelete(id);
  }
}

module.exports = new EstablecimientoRepository();
