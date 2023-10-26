// controllers/roomController.js

const Room = require('../models/Room');

// Obtener todas las habitaciones
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Agregar una nueva habitación
exports.addRoom = async (req, res) => {
  const { name, number, capacity, price, description, images } = req.body;

  try {
    const newRoom = new Room({ name, number, capacity, price, description, images });
    const room = await newRoom.save();
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo agregar la habitación' });
  }
};

// Actualizar una habitación
exports.updateRoom = async (req, res) => {
  const roomId = req.params.id;
  const { name, number, capacity, price, description, images } = req.body;

  try {
    const room = await Room.findByIdAndUpdate(roomId, {name, number, capacity, price, description, images }, { new: true });
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar la habitación' });
  }
};

// Eliminar una habitación
exports.deleteRoom = async (req, res) => {
  const roomId = req.params.id;

  try {
    await Room.findByIdAndRemove(roomId);
    res.json({ message: 'Habitación eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar la habitación' });
  }
};
