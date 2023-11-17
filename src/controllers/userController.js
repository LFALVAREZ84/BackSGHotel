import User from '../models/User';

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
