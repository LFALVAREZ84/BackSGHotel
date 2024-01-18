// Rutas
import express from 'express';
import { registerUser } from '../controllers/registerController';
import { loginUser } from '../controllers/loginController';
import { blockUser } from '../controllers/userController';
import authMiddleware from '../middlewaress/authMiddleware';

const userController = require('../controllers/userController');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Eliminar un usuario por ID
router.delete('/:id', userController.deleteUser);

// Rutas para usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta para bloquear un usuario (solo accesible por administradores)
router.put('/:id/block', authMiddleware, blockUser);

export default router;