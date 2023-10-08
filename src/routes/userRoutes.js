// Rutas
import express from 'express';
import { registerUser } from '../controllers/registerController';
import { loginUser } from '../controllers/loginController';

const router = express.Router();

// Rutas para usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;