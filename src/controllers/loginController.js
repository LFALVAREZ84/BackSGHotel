// Controlador del Login

import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
  try {
    const { email, pass } = req.body;

    // Busca el usuario por correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Compara contraseñas
    const match = await bcrypt.compare(pass, user.pass);

    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Token de autenticación
    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export { loginUser };