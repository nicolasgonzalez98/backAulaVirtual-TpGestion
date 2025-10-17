require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT;
const authRoutes = require('./routes/auth.routes');
const establecimientosRoutes = require('./routes/establecimiento.routes'); 
const connectDB = require('./database/connection');


app.use(cors());
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
  res.send('Hola desde Aula Virtual 👋');
});

app.use('/api/auth', authRoutes);
app.use('/api/establecimientos', establecimientosRoutes);


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});