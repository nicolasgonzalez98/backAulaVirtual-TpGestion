const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      enum: ['alumno', 'docente', 'admin', 'superadmin'],
      required: true
    },
    establecimientos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Establecimiento' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema)
