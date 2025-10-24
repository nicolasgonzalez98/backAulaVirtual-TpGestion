const claseService = require('../services/clase.service');

class ClaseController {
  async crear(req, res) {
    try {
      const clase = await claseService.crearClase(req.body);
      res.status(201).json(clase);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la clase' });
    }
  }

  async listar(req, res) {
    try {
      const clases = await claseService.listarClases();
      res.status(200).json(clases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las clases' });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const clase = await claseService.obtenerClase(req.params.id);
      if (!clase) return res.status(404).json({ message: 'Clase no encontrada' });
      res.status(200).json(clase);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la clase' });
    }
  }

  async actualizar(req, res) {
    try {
      const clase = await claseService.actualizarClase(req.params.id, req.body);
      res.status(200).json(clase);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la clase' });
    }
  }

  async eliminar(req, res) {
    try {
      await claseService.eliminarClase(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la clase' });
    }
  }

  // Endpoints adicionales
  async listarPorCurso(req, res) {
    try {
      const clases = await claseService.listarPorCurso(req.params.idCurso);
      res.status(200).json(clases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener clases del curso' });
    }
  }

  async listarPorRangoFechas(req, res) {
    try {
      const { desde, hasta } = req.query;
      const clases = await claseService.listarPorRangoFechas(desde, hasta);
      res.status(200).json(clases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener clases por rango de fechas' });
    }
  }
}

module.exports = new ClaseController();
