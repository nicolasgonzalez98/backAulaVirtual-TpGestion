import mongoose from 'mongoose';

const ClaseSchema = new mongoose.Schema(
  {
    curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
    docentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    fecha: { type: Date, required: true },
    qr_code: { type: String, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model('Clase', ClaseSchema);
