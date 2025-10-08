require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT;
const authRoutes = require('./routes/auth.routes');
const connectDB = require('./database/connection');


app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});