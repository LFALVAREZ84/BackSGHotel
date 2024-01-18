// userController.js
import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewaress/jsw';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndRemove(userId);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar el usuario' });
  }
};

// Bloquear un usuario por ID
export const blockUser = async (req, res) => {
  const userIdToBlock = req.params.id;

  try {
    const requestingUserId = req.userData.userId; // Obtener el ID del usuario que realiza la solicitud
    console.log('ID del usuario que realiza la solicitud:', requestingUserId);

    const userToBlock = await User.findById(userIdToBlock);

    if (!userToBlock) {
      console.error('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si el usuario que realiza la solicitud es administrador
    if (req.userData.role !== 'admin') {
      console.log('Rol del usuario que realiza la solicitud:', req.userData.role);
      console.log('Usuario no es administrador');
      throw new Error('No autorizado');
    }

    console.log('Usuario a bloquear:', userToBlock); // Agrega este log
    userToBlock.blocked = true;
    await userToBlock.save();

    console.log('Usuario bloqueado correctamente');
    res.json({ message: 'Usuario bloqueado correctamente' });
  } catch (error) {
    console.error('Error al bloquear el usuario:', error.message);
    res.status(401).json({ error: 'No autorizado' });
  }
};

// Registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    const newUser = await User.create({ name, email, password });

    // Emisión del token al registrar
    const token = generateToken(newUser._id, newUser.role);

    res.json({ token, userId: newUser._id, role: newUser.role });
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador del Login
export const loginUser = async (req, res) => {
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
    const token = generateToken(user._id, user.role);

    // Envía un mensaje de éxito junto con el token y el rol
    res.json({ message: 'Inicio de sesión exitoso', token, role: user.role });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
