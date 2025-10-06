import mongoose from 'mongoose';

const AsistenciaSchema = new mongoose.Schema(
  {
    clase: { type: mongoose.Schema.Types.ObjectId, ref: 'Clase', required: true },
    alumno: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    estado: {
      type: String,
      enum: ['presente', 'ausente', 'justificado'],
      default: 'ausente'
    },
    hora_registro: { type: Date, default: Date.now },
    metodo_registro: { type: String, enum: ['qr', 'manual'] }
  },
  { timestamps: true }
);

export default mongoose.model('Asistencia', AsistenciaSchema);
