

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Para almacenar rutas de imágenes
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;