import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './database/connection.js';
import cursoRoutes from './routes/curso.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
connectDB();

// // Rutas
// app.use('/', cursoRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});