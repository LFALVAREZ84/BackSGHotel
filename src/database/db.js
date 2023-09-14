const uri = process.env.PORTDB;
const db = process.env.DB;



const connectDb = async () => {
  try {
    await mongoose.connect(`${uri}/${db}`, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("DB esta conectado");

    const allHabitaciones = await HabitacionModel.find(); //buscamos todos los documentos de la coleccion
    console.log(allHabitaciones);

    const allUsuarios = await UsuarioModel.find(); //buscamos todos los documentos de la coleccion
    console.log(allUsuarios);


  }

  catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
