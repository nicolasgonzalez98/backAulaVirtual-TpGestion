import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema(
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

export default mongoose.model('Usuario', UsuarioSchema);
