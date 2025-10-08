import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/usuario.repository.js';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

export const register = async ({ nombre, apellido, email, password, rol }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error('El email ya está registrado');
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    nombre,
    apellido,
    email,
    password: hashedPassword,
    rol
  });

  return {
    message: 'Usuario creado exitosamente',
    user: {
      _id: newUser._id,
      email: newUser.email,
      rol: newUser.rol
    }
  };
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    const error = new Error('Contraseña incorrecta');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { _id: user._id, rol: user.rol },
    SECRET_KEY,
    { expiresIn: '2h' }
  );

  return {
    message: 'Inicio de sesión exitoso',
    token,
    user: {
      _id: user._id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      rol: user.rol
    }
  };
};
