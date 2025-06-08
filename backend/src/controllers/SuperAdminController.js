import SuperAdmin from '../models/SuperAdmin.js'
import mongoose from 'mongoose'
import Estudiante from '../models/Estudiantes.js'
import RedComunitaria from '../models/RedComunitaria.js'
import { sendMailToRecoveryPassword } from "../config/nodemailer.js"
import { crearTokenJWT } from "../middlewares/JWTEstudiante.js"

//Controladores para la gestión de la cuenta
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
  }
  const superAdminBDD = await SuperAdmin.findOne({ email }).select("-__v -token -updatedAt -createdAt")
  if (!superAdminBDD) {
    return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" })
  }
  if (superAdminBDD.confirmEmail === false) {
    return res.status(403).json({ msg: "Lo sentimos, debe verificar su cuenta" })
  }
  const verificarPassword = await superAdminBDD.matchPassword(password)
  if (!verificarPassword) {
    return res.status(401).json({ msg: "Lo sentimos, la contraseña no es la correcto" })
  }
  const { nombre, apellido, celular, _id, rol } = superAdminBDD
  const token = crearTokenJWT(superAdminBDD._id, superAdminBDD.rol)

  res.status(200).json({
    token,
    rol,
    nombre,
    apellido,
    celular,
    _id,
    email: superAdminBDD.email
  })
}

const recuperarPassword = async (req, res) => {
  const { email } = req.body
  if (Object.values(req.body).includes("")) {
    return res.status(404).json({ msg: "Lo sentimos, debes llenar todos los campos" })
  }

  const superAdminBDD = await SuperAdmin.findOne({ email })
  if (!superAdminBDD) {
    return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" })
  }

  const token = superAdminBDD.crearToken()
  superAdminBDD.token = token

  await sendMailToRecoveryPassword(email, token)
  await superAdminBDD.save()

  res.status(200).json({ msg: "Revisa tu correo electrónico para reestablecer tu cuenta" })
}

const comprobarTokenPasword = async (req, res) => {
  const { token } = req.params

  if (!token) {
    return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" })
  }

  const superAdminBDD = await SuperAdmin.findOne({ token })
  if (!superAdminBDD || superAdminBDD.token !== token) {
    return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" })
  }

  res.status(200).json({ msg: "Token confirmado, ya puedes crear tu nueva contraseña" })
}

const crearNuevoPassword = async (req, res) => {
  const { password, confirmpassword } = req.body
  const { token } = req.params

  if (Object.values(req.body).includes("")) {
    return res.status(404).json({ msg: "Lo sentimos, debes llenar todos los campos" })
  }

  if (password !== confirmpassword) {
    return res.status(404).json({ msg: "Lo sentimos, los passwords no coinciden" })
  }

  const superAdminBDD = await SuperAdmin.findOne({ token })
  if (!superAdminBDD || superAdminBDD.token !== token) {
    return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" })
  }

  superAdminBDD.token = null
  superAdminBDD.password = await superAdminBDD.encrypPassword(password)

  await superAdminBDD.save()

  res.status(200).json({ msg: "Felicitaciones, ya puedes iniciar sesión con tu nueva contraseña" })
}

const actualizarPerfil = async (req, res)=>{
    const {id} = req.params
    const {nombre,apellido,direccion,celular,email} = req.body
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const superAdminBDD = await SuperAdmin.findById(id)
    if(!superAdminBDD) return res.status(404).json({msg:`Lo sentimos, no existe el usuario ${id}`})
    if (superAdminBDD.email != email)
    {
        const superAdminBDDMail = await SuperAdmin.findOne({email})
        if (superAdminBDDMail)
        {
            return res.status(404).json({msg:`Lo sentimos, el existe ya se encuentra registrado`})  
        }
    }
    superAdminBDD.nombre = nombre ?? superAdminBDD.nombre
    superAdminBDD.apellido = apellido ?? superAdminBDD.apellido
    superAdminBDD.direccion = direccion ?? superAdminBDD.direccion
    superAdminBDD.celular = celular ?? superAdminBDD.celular
    superAdminBDD.email = email ?? superAdminBDD.email
    await superAdminBDD.save()
    console.log(superAdminBDD)
    res.status(200).json({msg: "Datos actualizados correctamente"})
}

const actualizarPassword = async (req,res)=>{
    const superAdminBDD = await SuperAdmin.findById(req.superAdminBDD._id)
    if(!veterinarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el usario ${id}`})
    const verificarPassword = await superAdminBDD.matchPassword(req.body.passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, la contraseña actual no es la correcto"})
    superAdminBDD.password = await superAdminBDD.encrypPassword(req.body.passwordnuevo)
    await superAdminBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}

const perfil = (req, res)=>{
    delete req.SuperAdminBDD.token
    delete req.SuperAdminBDD.confirmEmail
    delete req.SuperAdminBDD.createdAt
    delete req.SuperAdminBDD.updatedAt
    delete req.SuperAdminBDD.__v
    res.status(200).json(req.SuperAdminBDD)
}

// Controladores para le gestión de estudiantes
const crearEstudiante = async (req, res) => {
  try {
    const { nombre, apellido, celular, email, password, rol, redComunitaria } = req.body

    const existe = await Estudiante.findOne({ email })
    if (existe) {
      return res.status(400).json({ msg: 'El email ya está registrado' })
    }

    const nuevoEstudiante = new Estudiante({
      nombre,
      apellido,
      celular,
      email,
      rol,
      redComunitaria
    })

    nuevoEstudiante.password = await nuevoEstudiante.encrypPassword(password)
    nuevoEstudiante.crearToken()

    await nuevoEstudiante.save()

    res.status(201).json({
      mensaje: 'Estudiante creado exitosamente',
      estudiante: {
        id: nuevoEstudiante._id,
        nombre: nuevoEstudiante.nombre,
        apellido: nuevoEstudiante.apellido,
        email: nuevoEstudiante.email,
        rol: nuevoEstudiante.rol,
        redComunitaria: nuevoEstudiante.redComunitaria
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const obtenerEstudiantes = async (req, res) => {
  const estudiantes = await Estudiante.find()
  res.json(estudiantes);
}

const obtenerEstudiantePorId = async (req, res) => {
  const estudiante = await Estudiante.findById(req.params.id)
  if (!estudiante) {
    return res.status(404).json({ msg: 'Estudiante no encontrado' })
  }
  res.json(estudiante)
}

const actualizarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id)
    if (!estudiante) {
      return res.status(404).json({ msg: 'Estudiante no encontrado' })
    }

    const camposActualizados = req.body

    if (camposActualizados.password) {
      camposActualizados.password = await estudiante.encrypPassword(camposActualizados.password)
    }

    const estudianteActualizado = await Estudiante.findByIdAndUpdate(
      req.params.id,
      camposActualizados,
      { new: true }
    );

    res.json(estudianteActualizado)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const eliminarEstudiante = async (req, res) => {
  await Estudiante.findByIdAndDelete(req.params.id)
  res.json({ msg: 'Estudiante eliminado correctamente' })
}

//Controladores para la gestión de redes comunitarias
const crearRed = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const existente = await RedComunitaria.findOne({ nombre });
    if (existente) {
      return res.status(400).json({ mensaje: 'Ya existe una red con ese nombre' })
    }

    const estudiantes = await Estudiante.find({ redComunitaria: nombre })

    const red = new RedComunitaria({
      nombre,
      descripcion,
      miembros: estudiantes.map(e => e._id),
      cantidadMiembros: estudiantes.length
    })

    await red.save();

    res.status(201).json({ mensaje: 'Red comunitaria creada correctamente', red })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const obtenerRedes = async (req, res) => {
  const redes = await RedComunitaria.find().populate('miembros', 'nombre apellido email')
  res.json(redes);
}

const obtenerRedPorId = async (req, res) => {
  const red = await RedComunitaria.findById(req.params.id).populate('miembros', 'nombre apellido email')
  if (!red) return res.status(404).json({ mensaje: 'Red no encontrada' })
  res.json(red);
}

const actualizarRed = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const estudiantes = await Estudiante.find({ redComunitaria: nombre })

    const redActualizada = await RedComunitaria.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        descripcion,
        miembros: estudiantes.map(e => e._id),
        cantidadMiembros: estudiantes.length
      },
      { new: true }
    )

    res.json(redActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const eliminarRed = async (req, res) => {
  await RedComunitaria.findByIdAndDelete(req.params.id)
  res.json({ mensaje: 'Red eliminada correctamente' })
}

export {
  login,
  recuperarPassword,
  comprobarTokenPasword,
  crearNuevoPassword,
  perfil,
  actualizarPerfil,
  actualizarPassword,
  crearEstudiante,
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  actualizarEstudiante,
  eliminarEstudiante,
  crearRed,
  obtenerRedes,
  obtenerRedPorId,
  actualizarRed,
  eliminarRed
}
