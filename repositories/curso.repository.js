const Curso = require('../models/curso.model');

class CursoRepository {
  // Crear un curso
  async crearCurso(data) {
    const curso = new Curso(data);
    return await curso.save();
  };

  // Obtener todos los cursos
  async obtenerCursos() {
    return await Curso.find().populate('establecimiento_id');
  };

  // Obtener curso por ID
  async obtenerCursoPorId(id) {
    return await Curso.findById(id).populate('establecimiento_id');
  };

  // Actualizar curso
  async actualizarCurso(id, data) {
    return await Curso.findByIdAndUpdate(id, data, { new: true });
  };

  // Eliminar curso
  async eliminarCurso(id) {
    return await Curso.findByIdAndDelete(id);
  };

  // Obtener cursos por establecimiento
  async obtenerCursosPorEstablecimiento(establecimientoId) {
    return await Curso.find({ establecimiento_id: establecimientoId }).populate('establecimiento_id');
  };

  // Buscar cursos por nombre o código
  async buscarCursosByNameOrCode(query) {
    return await Curso.find({
      $or: [
        { nombre: new RegExp(query, 'i') },
        { codigo: new RegExp(query, 'i') }
      ]
    }).populate('establecimiento_id');
  }

    // Vincular alumno a curso
  async vincularAlumno(cursoId, alumnoId) {
    return await Curso.findByIdAndUpdate(
      cursoId,
      { $addToSet: { alumno: alumnoId } },
      { new: true }
    ).populate('alumno', 'nombre apellido email');
  }

  // Desvincular alumno de curso
  async desvincularAlumno(cursoId, alumnoId) {
    return await Curso.findByIdAndUpdate(
      cursoId,
      { $pull: { alumno: alumnoId } },
      { new: true }
    );
  }

  // Obtener cursos por alumno
  async obtenerCursosPorAlumno(alumnoId) {
    return await Curso.find({ alumno: alumnoId }).populate('establecimiento_id');
  }
}

module.exports = new CursoRepository();