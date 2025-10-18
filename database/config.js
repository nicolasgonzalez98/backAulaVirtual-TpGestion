import dotenv from 'dotenv';
dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;

export const uri_db = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vazbe0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;