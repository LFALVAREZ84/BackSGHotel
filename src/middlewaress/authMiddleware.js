// authMiddleware.js
import { verifyToken } from '../middlewaress/jsw';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.body.token;

    // Verificar si se proporcionó un token
    if (!token) {
      console.error('Token no proporcionado');
      throw new Error('Token no proporcionado');
    }

    const decodedToken = verifyToken(token);

    console.log('Token decodificado:', decodedToken);
    console.log('Valor esperado del rol:', 'admin');

    // Asegúrate de configurar req.userData correctamente
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };

    // Verificar si el usuario es administrador
    if (req.userData.role !== 'admin') {
      console.log('Rol del token:', req.userData.role);
      console.log('Usuario no es administrador');
      throw new Error('No autorizado');
    }

    console.log('Información del usuario:', req.userData);
    next();
  } catch (error) {
    console.error('Error de autenticación:', error.message);
    res.status(401).json({ error: 'No autorizado' });
  }
};

export default authMiddleware;
