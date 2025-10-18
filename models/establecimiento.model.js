const mongoose = require('mongoose');

const EstablecimientoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    direccion: String,
    telefono: String,
    email: String,
    latitud: { type: Number, required: false },
    longitud: { type: Number, required: false },
    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }],
    responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Establecimiento', EstablecimientoSchema);
