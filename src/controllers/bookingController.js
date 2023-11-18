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

export const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    const currentDate = new Date();
    const checkInDate = new Date(booking.checkIn);

    // Verificar si la cancelación se está intentando dos días antes del check-in
    const timeDifference = checkInDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference <= 2) {
      return res.status(400).json({ error: 'No se puede cancelar la reserva dos días antes del check-in' });
    }

    await Booking.findByIdAndDelete(bookingId);

    await Room.findByIdAndUpdate(booking.roomId, { disponible: true });

    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar reserva' });
  }
};
