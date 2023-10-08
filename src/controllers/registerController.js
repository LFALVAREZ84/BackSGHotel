
import User from '../models/User';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  try {
    const { name, surname, email, pass, rol } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = new User({
      name,
      surname,
      email,
      pass: hashedPassword,
      rol,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export { registerUser };
