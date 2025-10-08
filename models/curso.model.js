const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    codigo: { type: String },
    anio: Number,
    descripcion: String,
    establecimiento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Establecimiento',
      required: true
    },
    docentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Curso', CursoSchema);