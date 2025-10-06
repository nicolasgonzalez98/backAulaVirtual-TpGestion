import express from 'express';
import cors from 'cors';
import cursoRoutes from './routes/curso.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/cursos', cursoRoutes);

export default app;