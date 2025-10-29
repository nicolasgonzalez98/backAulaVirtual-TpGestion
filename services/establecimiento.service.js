const establecimientoRepository = require('../repositories/establecimiento.repository');
const Usuario = require('../models/usuario.model');

class EstablecimientoService {
  async crearEstablecimiento(data) {
    const { nombre, direccion, telefono, email, latitud, longitud, responsable } = data;

    // Verificar si ya existe un usuario con ese email
    const existeUsuario = await Usuario.findOne({ email: responsable.email });
    if (existeUsuario) {
      throw new Error('Ya existe un usuario con ese email.');
    }

    // Crear el usuario responsable
    const nuevoUsuario = new Usuario({
      nombre: responsable.nombre,
      apellido: responsable.apellido,
      email: responsable.email,
      password: responsable.password,
      rol: 'admin'
    });
    await nuevoUsuario.save();
    const establecimiento = await establecimientoRepository.crear({
      nombre,
      direccion,
      telefono,
      email,
      latitud,
      longitud,
      responsable: nuevoUsuario._id
    });

    // Relacionamos el establecimiento en el usuario
    nuevoUsuario.establecimiento = establecimiento._id;
    await nuevoUsuario.save();
    console.log(nuevoUsuario);
    return {
        message: 'Establecimiento registrado correctamente.',
        establecimiento,
        usuario: {
          nombre: nuevoUsuario.nombre,
          email: nuevoUsuario.email,
          rol: nuevoUsuario.rol
        }
    }
}

  async listarEstablecimientos() {
    return await establecimientoRepository.obtenerTodos();
  }

  async obtenerEstablecimiento(id) {
    return await establecimientoRepository.obtenerPorId(id);
  }

  async actualizarEstablecimiento(id, data) {
    return await establecimientoRepository.actualizar(id, data);
  }

  async eliminarEstablecimiento(id) {
    return await establecimientoRepository.eliminar(id);
  }
}

module.exports = new EstablecimientoService();
