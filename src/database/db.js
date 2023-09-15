const mongoose = require('mongoose');
const uri = process.env.PORTDB;
const db = process.env.DB;



const connectDb = async () => {
  try {
    await mongoose.connect(`${uri}/${db}`, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("DB esta conectado");

    

  }

  catch (error) {
    console.log(error);
   
  }
};

module.exports = connectDb;
