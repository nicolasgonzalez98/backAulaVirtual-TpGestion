const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connection');

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
const cursoRoutes = require('./routes/curso.routes');

// Rutas
app.use('/api/establecimientos', establecimientosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/asistencias', asistenciasRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/cursos', cursoRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});