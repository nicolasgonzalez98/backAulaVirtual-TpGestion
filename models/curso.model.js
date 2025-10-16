import mongoose from 'mongoose';

const cursoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    anio: { type: Number, required: true },
    descripcion: { type: String },
    establecimiento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Establecimiento', required: true }
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


export const Curso = mongoose.model('Curso', cursoSchema);