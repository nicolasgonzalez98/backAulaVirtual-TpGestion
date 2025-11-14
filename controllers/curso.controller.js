const cursoService = require('../services/curso.service');



class CursoController {
  // Crear un curso
  async crearCurso(req, res) {
    try {
      const curso = await cursoService.crearCurso(req.body);
      res.status(201).json(curso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Obtener todos los cursos
  async obtenerCursos(req, res) {
    try {
      const cursos = await cursoService.obtenerCursos();
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtener curso por ID
  async obtenerCursoPorId(req, res) {
    try {
      const curso = await cursoService.obtenerCursoPorId(req.params.id);
      if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
      res.status(200).json(curso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Actualizar curso
  async actualizarCurso(req, res) {
    try {
      const curso = await cursoService.actualizarCurso(req.params.id, req.body);
      if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
      res.status(200).json(curso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Eliminar curso
  async eliminarCurso(req, res) {
    try {
      const curso = await cursoService.eliminarCurso(req.params.id);
      if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Obtener cursos por establecimiento
  async obtenerCursosPorEstablecimiento(req, res) {
    try {
      const cursos = await cursoService.obtenerCursosPorEstablecimiento(req.params.establecimientoId);
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Buscar cursos por nombre o código
  async buscarCursosByNameOrCode(req, res) {
    try {
      const cursos = await cursoService.buscarCursosByNameOrCode(req.query.q);
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Vincular alumno a curso
  async vincularAlumno(req, res) {
    try {
      const { cursoId, alumnoId } = req.params;
      const curso = await cursoService.vincularAlumno(cursoId, alumnoId);
      res.status(200).json(curso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Desvincular alumno de curso
  async desvincularAlumno(req, res) {
    try {
      const { cursoId, alumnoId } = req.params;
      const curso = await cursoService.desvincularAlumno(cursoId, alumnoId);
      res.status(200).json(curso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener cursos por alumno
  async obtenerCursosPorAlumno(req, res) {
    try {
      const cursos = await cursoService.obtenerCursosPorAlumno(req.params.alumnoId);
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener cursos por docente
  async obtenerCursosPorDocente(req, res) {
    try {
      const cursos = await cursoService.obtenerCursosPorDocente(req.params.docenteId);
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CursoController();
