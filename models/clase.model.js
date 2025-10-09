const mongoose = require('mongoose');

const ClaseSchema = new mongoose.Schema(
  {
    curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
    docentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    fecha: { type: Date, required: true },
    tipo: { type: String, enum: ['presencial', 'virtual'], default: 'presencial' },
    qr_code: { type: String, unique: true },
    qr_type: { type: String, enum: ['static', 'dynamic'], default: 'static' },
    qr_expires_at: { type: Date },
    // Si en el futuro querés guardar ubicación de escaneo, se puede agregar aquí
    // location_required: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Clase', ClaseSchema);
