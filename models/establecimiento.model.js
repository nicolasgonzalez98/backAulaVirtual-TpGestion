import mongoose from 'mongoose';

const EstablecimientoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    direccion: String,
    telefono: String,
    email: String,
    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }]
  },
  { timestamps: true }
);

export default mongoose.model('Establecimiento', EstablecimientoSchema);
