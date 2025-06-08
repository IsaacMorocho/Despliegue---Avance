import Estudiante from '../models/Estudiantes.js'
import mongoose from "mongoose"
import { sendMailToRegister, sendMailToRecoveryPasswordE } from '../config/nodemailer.js'
import { crearTokenJWT } from "../middlewares/JWT.js"

const loginEstudiante = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
  }

  const estudianteBDD = await Estudiante.findOne({ email }).select("-__v -token -updatedAt -createdAt")
  if (!estudianteBDD) {
    return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" })
  }

  if (!estudianteBDD.confirmEmail) {
    return res.status(403).json({ msg: "Lo sentimos, debes verificar tu cuenta" })
  }

  const verificarPassword = await estudianteBDD.matchPassword(password)
  if (!verificarPassword) {
    return res.status(401).json({ msg: "Lo sentimos, la contraseña no es la correcta" })
  }

  const { nombre, apellido, celular, _id, rol, redComunitaria } = estudianteBDD
  const token = crearTokenJWT(estudianteBDD._id, estudianteBDD.rol)

  res.status(200).json({
    token,
    rol,
    nombre,
    apellido,
    celular,
    _id,
    email: estudianteBDD.email,
    redComunitaria
  })
}

const registroEstudiante = async (req, res) => {
  try {
    const { nombre, apellido, celular, email, password, redComunitaria } = req.body

    if ([nombre, apellido, email, password].includes("")) {
      return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos obligatorios" });
    }

    const verificarEmailBDD = await Estudiante.findOne({ email });
    if (verificarEmailBDD) {
      return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })
    }

    const nuevoEstudiante = new Estudiante({
      nombre,
      apellido,
      celular,
      email,
      password,
      redComunitaria,
      rol: "Estudiante"
    });

    nuevoEstudiante.password = await nuevoEstudiante.encrypPassword(password)
    const token = nuevoEstudiante.crearToken()

    await nuevoEstudiante.save();
    await sendMailToRegister(email, token)

    return res.status(201).json({
      msg: "Revisa tu correo electrónico para confirmar tu cuenta",
      estudiante: {
        id: nuevoEstudiante._id,
        nombre: nuevoEstudiante.nombre,
        apellido: nuevoEstudiante.apellido,
        email: nuevoEstudiante.email,
        rol: nuevoEstudiante.rol,
        redComunitaria: nuevoEstudiante.redComunitaria
      }
    })

  } catch (error) {
    console.error("Error al registrar estudiante:", error)
    if (!res.headersSent) {
      return res.status(500).json({ msg: "Error en el servidor" })
    }
  }
}

const confirmarMailEstudiante = async (req, res) => {
  const token = req.params.token

  const estudianteBDD = await Estudiante.findOne({ token })

  if (!estudianteBDD) {
    return res.status(404).json({ msg: "Token inválido" })
  }

  if (!estudianteBDD.token) {
    return res.status(400).json({ msg: "La cuenta ya ha sido confirmada previamente" })
  }

  estudianteBDD.token = null;
  estudianteBDD.confirmEmail = true;

  await estudianteBDD.save();

  return res.status(200).json({ msg: "Correo confirmado, ya puedes iniciar sesión" })
}

const recuperarPasswordEstudiante = async (req, res) => {
  const { email } = req.body;

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
  }

  const estudianteBDD = await Estudiante.findOne({ email })
  if (!estudianteBDD) {
    return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" })
  }

  const token = estudianteBDD.crearToken()
  estudianteBDD.token = token;

  await sendMailToRecoveryPasswordE(email, token)
  await estudianteBDD.save();

  return res.status(200).json({ msg: "Revisa tu correo electrónico para reestablecer tu cuenta" })
}

const comprobarTokenPasswordEstudiante = async (req, res) => {
  const { token } = req.params;

  const estudianteBDD = await Estudiante.findOne({ token })

  if (!estudianteBDD || estudianteBDD.token !== token) {
    return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" })
  }

  return res.status(200).json({ msg: "Token confirmado, ya puedes crear tu nuevo password" })
}

const crearNuevoPasswordEstudiante = async (req, res) => {
  const { password, confirmpassword } = req.body

  if ([password, confirmpassword].includes("")) {
    return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ msg: "Lo sentimos, los passwords no coinciden" })
  }

  const estudianteBDD = await Estudiante.findOne({ token: req.params.token })

  if (!estudianteBDD || estudianteBDD.token !== req.params.token) {
    return res.status(404).json({ msg: "Lo sentimos, no se puede validar la cuenta" })
  }

  estudianteBDD.token = null
  estudianteBDD.password = await estudianteBDD.encrypPassword(password)

  await estudianteBDD.save()

  return res.status(200).json({ msg: "Felicitaciones, ya puedes iniciar sesión con tu nuevo password" })
}

const perfilEstudiante = (req, res) => {
  delete req.estudianteBDD.token
  delete req.estudianteBDD.confirmEmail
  delete req.estudianteBDD.createdAt
  delete req.estudianteBDD.updatedAt
  delete req.estudianteBDD.__v

  res.status(200).json(req.estudianteBDD)
}

const actualizarPerfilEstudiante = async (req, res) => {
  const { id } = req.params
  const { nombre, apellido, celular, email, redComunitaria } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Lo sentimos, debe ser un ID válido" })
  }

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
  }

  const estudianteBDD = await Estudiante.findById(id)
  if (!estudianteBDD) {
    return res.status(404).json({ msg: `Lo sentimos, no existe el estudiante ${id}` })
  }

  if (estudianteBDD.email !== email) {
    const estudianteBDDMail = await Estudiante.findOne({ email })
    if (estudianteBDDMail) {
      return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })
    }
  }

  estudianteBDD.nombre = nombre ?? estudianteBDD.nombre
  estudianteBDD.apellido = apellido ?? estudianteBDD.apellido
  estudianteBDD.celular = celular ?? estudianteBDD.celular
  estudianteBDD.email = email ?? estudianteBDD.email
  estudianteBDD.redComunitaria = redComunitaria ?? estudianteBDD.redComunitaria

  await estudianteBDD.save()

  res.status(200).json(estudianteBDD)
}

const actualizarPasswordEstudiante = async (req, res) => {
  const estudianteBDD = await Estudiante.findById(req.estudianteBDD._id)

  if (!estudianteBDD) {
    return res.status(404).json({ msg: "Lo sentimos, no existe el estudiante" })
  }

  const verificarPassword = await estudianteBDD.matchPassword(req.body.passwordactual)

  if (!verificarPassword) {
    return res.status(400).json({ msg: "Lo sentimos, la contraseña actual no es correcta" })
  }

  estudianteBDD.password = await estudianteBDD.encrypPassword(req.body.passwordnuevo)
  await estudianteBDD.save()

  res.status(200).json({ msg: "Contraseña actualizada correctamente" })
}


export {
  registroEstudiante,
  confirmarMailEstudiante,
  recuperarPasswordEstudiante,
  comprobarTokenPasswordEstudiante,
  crearNuevoPasswordEstudiante,
  loginEstudiante,
  perfilEstudiante,
  actualizarPerfilEstudiante,
  actualizarPasswordEstudiante
}
