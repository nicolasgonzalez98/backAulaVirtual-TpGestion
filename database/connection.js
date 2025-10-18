import mongoose from 'mongoose';
import { uri_db } from './config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(uri_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado ✅');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;