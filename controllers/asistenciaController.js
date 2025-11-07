const asistenciaService = require('../services/asistencia.service');
const Curso = require('../models/curso.model');
const Clase = require('../models/clase.model');
const Asistencia = require('../models/asistencia.model');

/** Haversine (metros) */
function distanciaEnMetros(lat1, lon1, lat2, lon2) {
  const toRad = v => v * Math.PI / 180;
  const R = 6371000; // radio Tierra en metros
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

class AsistenciaController {
  async crear(req, res) {
    try {
      const asistencia = await asistenciaService.crearAsistencia(req.body);
      res.status(201).json(asistencia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la asistencia' });
    }
  }

  async listar(req, res) {
    try {
      const asistencias = await asistenciaService.listarAsistencias();
      res.status(200).json(asistencias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al listar las asistencias' });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const asistencia = await asistenciaService.obtenerAsistencia(req.params.id);
      if (!asistencia) return res.status(404).json({ message: 'No encontrada' });
      res.status(200).json(asistencia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la asistencia' });
    }
  }

  async actualizar(req, res) {
    try {
      const asistencia = await asistenciaService.actualizarAsistencia(req.params.id, req.body);
      res.status(200).json(asistencia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la asistencia' });
    }
  }

  async eliminar(req, res) {
    try {
      await asistenciaService.eliminarAsistencia(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la asistencia' });
    }
  }

  // Endpoints específicos
  async obtenerPorClase(req, res) {
    try {
      const asistencias = await asistenciaService.obtenerAsistenciasPorClase(req.params.idClase);
      res.status(200).json(asistencias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener asistencias por clase' });
    }
  }

  async obtenerPorAlumno(req, res) {
    try {
      const asistencias = await asistenciaService.obtenerAsistenciasPorAlumno(req.params.idAlumno);
      res.status(200).json(asistencias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener asistencias por alumno' });
    }
  }

  async registrarAsistencia(req, res){
    try {
      console.log('req.body:', req.body);
      const { cursoId, claseId } = req.params;
      const userId = req.user._id ? req.user._id.toString() : (req.user.id || req.user);// obtenido del middleware de auth
      const { latitude, longitude } = req.body || {};
      
      // 1️⃣ Verificar que el curso exista
      const curso = await Curso.findById(cursoId);
      if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

      // 2️⃣ Verificar que el usuario esté inscripto en el curso
      const estaInscripto = curso.alumnos.some(alumno => alumno.toString() === userId);
      if (!estaInscripto)return res.status(403).json({ message: 'No estás inscripto en este curso' });

      // 3️⃣ Verificar que la clase exista y pertenezca al curso
      const clase = await Clase.findById(claseId);
      if (!clase || clase.curso.toString() !== cursoId)
        return res.status(404).json({ message: 'Clase no encontrada o no pertenece al curso' });

      // 4) Si el curso tiene establecimiento con coords, validar geolocalización
      // Validar geolocalización si corresponde
      
      const geoRequired = req.body.geo === true;
      // 🔹 usar query ?geo=true solo en QR impreso
      if (geoRequired) {
        const establecimiento = await Curso.findById(cursoId)
          .populate('establecimiento_id')
          .then(c => c.establecimiento_id);

        console.log('Establecimiento para validación geoloc:', establecimiento);

        if (establecimiento && establecimiento.latitud != null && establecimiento.longitud != null) {
          if (latitude == null || longitude == null) {
            return res.status(400).json({ message: 'Se requiere ubicación para validar presencia en el establecimiento' });
          }

          const latE = Number(establecimiento.latitud);
          const lonE = Number(establecimiento.longitud);
          const latU = Number(latitude);
          const lonU = Number(longitude);
          console.log(`Validando ubicación del usuario: (${latU}, ${lonU}) vs establecimiento: (${latE}, ${lonE})`);

          const metros = distanciaEnMetros(latE, lonE, latU, lonU);
          const UMBRAL_METROS = 300;

          if (metros > UMBRAL_METROS) {
            
            return res.status(403).json({
              message: `Estás demasiado lejos del establecimiento (${Math.round(metros)} m). Debes estar dentro de ${UMBRAL_METROS} m para registrar asistencia.`,
            });
          }
        } else {
          console.warn(`Curso ${cursoId} no tiene lat/lon — no se valida ubicación.`);
        }
      }

      // 5- Buscar si ya existe asistencia registrada
      let asistencia = await Asistencia.findOne({ clase: claseId, alumno: userId });

      if (asistencia) {
        // Si ya existe, actualizar a presente (si no lo estaba)
        asistencia.estado = 'presente';
        asistencia.hora_registro = new Date();
        asistencia.metodo_registro = 'qr';
        await asistencia.save();
      } else {
        // Crear nueva asistencia
        asistencia = new Asistencia({
          clase: claseId,
          alumno: userId,
          estado: 'presente',
          metodo_registro: 'qr',
        });
        await asistencia.save();
      }

      return res.status(200).json({
        message: 'Asistencia registrada correctamente',
        asistencia,
      });
    } catch (error) {
      console.error('Error registrando asistencia:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
}

module.exports = new AsistenciaController();
