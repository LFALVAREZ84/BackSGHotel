// Controlador del Login

import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewaress/jsw';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca el usuario por correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Compara contraseñas
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Token de autenticación con el rol del usuario
    const token = generateToken(user._id, user.rol);

    console.log('Token generado:', token); // <-- Nuevo console log

    // Envía un mensaje de éxito junto con el token y el rol
    res.json({ message: 'Inicio de sesión exitoso', token, role: user.rol });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export { loginUser };
