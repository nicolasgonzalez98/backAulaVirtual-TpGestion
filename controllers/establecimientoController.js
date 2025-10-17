const establecimientoService = require('../services/establecimiento.service');

class EstablecimientoController {
  async crear(req, res) {
    try {
      const establecimiento = await establecimientoService.crearEstablecimiento(req.body);
      res.status(201).json(establecimiento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el establecimiento' });
    }
  }

  async listar(req, res) {
    try {
      const establecimientos = await establecimientoService.listarEstablecimientos();
      res.status(200).json(establecimientos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los establecimientos' });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const establecimiento = await establecimientoService.obtenerEstablecimiento(req.params.id);
      if (!establecimiento) return res.status(404).json({ message: 'No encontrado' });
      res.status(200).json(establecimiento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el establecimiento' });
    }
  }

  async actualizar(req, res) {
    try {
      const establecimiento = await establecimientoService.actualizarEstablecimiento(req.params.id, req.body);
      res.status(200).json(establecimiento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el establecimiento' });
    }
  }

  async eliminar(req, res) {
    try {
      await establecimientoService.eliminarEstablecimiento(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el establecimiento' });
    }
  }
}

module.exports = new EstablecimientoController();
