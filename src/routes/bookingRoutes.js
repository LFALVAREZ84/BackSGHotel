import express from 'express';
import { createBooking, deleteBooking } from '../controllers/bookingController'; // Importa el controlador de reservas

const router = express.Router();

router.post('/', createBooking); // Ruta para crear una reserva
router.delete('/:id', deleteBooking); // Ruta para eliminar una reserva por ID

export default router;