import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './database/connection';
import cursoRoutes from './routes/curso.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

require('./models/asistencia.model');
require('./models/clase.model');
require('./models/curso.model');
require('./models/establecimiento.model');
require('./models/usuario.model');

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const establecimientosRoutes = require('./routes/establecimiento.routes');
const asistenciasRoutes = require('./routes/asistencia.routes');
const clasesRoutes = require('./routes/clase.routes');

// Rutas
app.use('/api/establecimientos', establecimientosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/asistencias', asistenciasRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/cursos', cursoRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});