const asistenciaService = require('../services/asistencia.service');

class AsistenciaController {
  async crear(req, res) {
    try {
      const asistencia = await asistenciaService.crearAsistencia(req.body);
      res.status(201).json(asistencia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la asistencia' });
    }
  }

  async listar(req, res) {
    try {
      const asistencias = await asistenciaService.listarAsistencias();
      res.status(200).json(asistencias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al listar las asistencias' });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const asistencia = await asistenciaService.obtenerAsistencia(req.params.id);
      if (!asistencia) return res.status(404).json({ message: 'No encontrada' });
      res.status(200).json(asistencia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la asistencia' });
    }
  }

  async actualizar(req, res) {
    try {
      const asistencia = await asistenciaService.actualizarAsistencia(req.params.id, req.body);
      res.status(200).json(asistencia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la asistencia' });
    }
  }

  async eliminar(req, res) {
    try {
      await asistenciaService.eliminarAsistencia(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la asistencia' });
    }
  }

  // Endpoints específicos
  async obtenerPorClase(req, res) {
    try {
      const asistencias = await asistenciaService.obtenerAsistenciasPorClase(req.params.idClase);
      res.status(200).json(asistencias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener asistencias por clase' });
    }
  }

  async obtenerPorAlumno(req, res) {
    try {
      const asistencias = await asistenciaService.obtenerAsistenciasPorAlumno(req.params.idAlumno);
      res.status(200).json(asistencias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener asistencias por alumno' });
    }
  }
}

module.exports = new AsistenciaController();
