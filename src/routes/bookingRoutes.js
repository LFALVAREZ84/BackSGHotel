import express from 'express';
import { createBooking } from '../controllers/bookingController'; // Importa el controlador de reservas

const router = express.Router();

router.post('/create', createBooking); // Ruta para crear una reserva

export default router;