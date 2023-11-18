import Booking from '../models/Booking';
import Room from '../models/Room';

export const createBooking = async (req, res) => {
  try {
    const { roomId, userId, checkIn, checkOut, guests } = req.body;

    // Verificar si la habitación está disponible para las fechas seleccionadas
    const existingBooking = await Booking.findOne({
      roomId,
      $or: [
        { checkIn: { $gte: checkIn, $lt: checkOut } },
        { checkOut: { $gt: checkIn, $lte: checkOut } },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'La habitación no está disponible para estas fechas' });
    }

    const newBooking = new Booking({
      roomId,
      userId,
      checkIn,
      checkOut,
      guests,
    });

    await newBooking.save();

    res.status(201).json({ message: 'Reserva creada con éxito' });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear reserva' });
  }
};