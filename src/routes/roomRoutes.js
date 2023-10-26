

const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Obtener todas las habitaciones
router.get('/', roomController.getAllRooms);

// Agregar una nueva habitación
router.post('/', roomController.addRoom);

// Actualizar una habitación
router.put('/:id', roomController.updateRoom);

// Eliminar una habitación
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
