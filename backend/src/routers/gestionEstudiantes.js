import express from 'express';
import Estudiante from '../models/Estudiantes.js';
import { isSuperAdmin, autenticarToken } from '../middlewares/authSuperAdmin.js';

const router = express.Router();

// Crear estudiante (con contraseña encriptada)
router.post('/crear-estudiantes', autenticarToken, isSuperAdmin, async (req, res) => {
  try {
    const { nombre, apellido, celular, email, password, rol } = req.body;

    const existe = await Estudiante.findOne({ email });
    if (existe) {
      return res.status(400).json({ msg: 'El email ya está registrado' });
    }

    const nuevoEstudiante = new Estudiante({
      nombre,
      apellido,
      celular,
      email,
      rol
    });

    // Encriptar y asignar contraseña
    nuevoEstudiante.password = await nuevoEstudiante.encrypPassword(password);

    // Crear token si se usa confirmación por correo
    nuevoEstudiante.crearToken();

    await nuevoEstudiante.save();

    res.status(201).json({
      mensaje: 'Estudiante creado exitosamente',
      estudiante: {
        id: nuevoEstudiante._id,
        nombre: nuevoEstudiante.nombre,
        apellido: nuevoEstudiante.apellido,
        email: nuevoEstudiante.email,
        rol: nuevoEstudiante.rol
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los estudiantes
router.get('/estudiantes', autenticarToken, isSuperAdmin, async (req, res) => {
  const estudiantes = await Estudiante.find();
  res.json(estudiantes);
});

// Obtener un estudiante por ID
router.get('/estudiantes/:id', autenticarToken, isSuperAdmin, async (req, res) => {
  const estudiante = await Estudiante.findById(req.params.id);
  if (!estudiante) {
    return res.status(404).json({ msg: 'Estudiante no encontrado' });
  }
  res.json(estudiante);
});

// Actualizar estudiante (incluye lógica para encriptar nueva contraseña si se proporciona)
router.put('/actualizar-estudiantes/:id', autenticarToken,  isSuperAdmin, async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ msg: 'Estudiante no encontrado' });
    }

    const camposActualizados = req.body;

    // Si se proporciona un nuevo password, se encripta
    if (camposActualizados.password) {
      camposActualizados.password = await estudiante.encrypPassword(camposActualizados.password);
    }

    // Actualizar con los nuevos campos
    const estudianteActualizado = await Estudiante.findByIdAndUpdate(
      req.params.id,
      camposActualizados,
      { new: true }
    );

    res.json(estudianteActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar estudiante
router.delete('/eliminar-estudiantes/:id', autenticarToken, isSuperAdmin, async (req, res) => {
  await Estudiante.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Estudiante eliminado correctamente' });
});

export default router;
