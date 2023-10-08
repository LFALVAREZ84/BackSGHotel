const mongoose = require('mongoose');

const uri = process.env.PORTDB; // La URL completa, que ya incluye el nombre de la base de datos
// No es necesario utilizar process.env.DB aquí

const connectDb = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB está conectada");
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

module.exports = connectDb;
