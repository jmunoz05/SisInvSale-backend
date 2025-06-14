const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.register = async (req, res) => {
  
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();
    res.json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(400).json({ error: 'Email ya registrado' });
  }
}

exports.login = async (req, res) => {

  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ 'email': email });
  if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado' });

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) return res.status(400).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  res.json({ token, usuario: { nombre: usuario.nombre, email: usuario.email } });

}