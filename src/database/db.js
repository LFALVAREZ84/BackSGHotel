// src/database/db.js

const mongoose = require('mongoose');

const uri = process.env.PORTDB;
const db = process.env.DB || 'SGH'; // Utiliza 'SGH' como valor predeterminado si DB no está definido en el archivo .env

const connectDb = async () => {
  try {
    await mongoose.connect(`${uri}/${db}`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB está conectada");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
