const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    codigo: { type: String },
    anio: Number,
    descripcion: String,
    establecimiento_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Establecimiento',
      required: true
    },
    docentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    alumnos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    modalidadClases: {
      type: String,
      enum: ['fechas_preestablecidas', 'clases_diarias'],
      required: true,
    },
    // Para modalidad 'fechas_preestablecidas' -> las clases se crean manualmente (ya lo haces con tu modelo Clase)
    // Para modalidad 'clases_diarias' -> se generan automáticamente con estos campos:
    fechaInicio: { type: Date },
    fechaFin: { type: Date },
    duracionPorDiaHoras: { type: Number, default: 8 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Curso', CursoSchema);