// jwt.js

import jwt from 'jsonwebtoken';

const secretKey = 'secreto'; // Cambia esto y maneja tu clave secreta de manera segura

export const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    secretKey,
    { expiresIn: '1h' } // Duración del token, puedes ajustar esto según tus necesidades
  );
};

export const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    throw new Error('Token no válido');
  }
};

