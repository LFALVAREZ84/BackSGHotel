import express from "express";
import 'dotenv/config';
import cors from "cors";
import morgan from "morgan";

const connectDb = require("./src/database/db");



// Conectar a la base de datos
const initApp = async () => {
  try {
    await connectDb();
    app.listen(app.get("port"), () => {
      console.log(`BackEnd46i listening to PORT: ${app.get("port")}`);
    }).on("error", (error) => {
      console.log("ERROR:", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("ERROR:", error);
    process.exit(1);
  }
};


initApp();




// Crear una instancia de express
const app = express();

// Configurar el puerto en el que se va a ejecutar el servidor
//app.set("port", process.env.PORT );
app.set('port', process.env.PORT || 8080);


//inicializamos nuestro backend 
app.listen(app.get('port'), () => {
    console.log(`backend listening to port ${app.get('port')}`);
  }).on('error', (error) => {
    console.log('ERROR:', error);
    process.exit(1);
  });
// Conect
console.log('estamos conectados');

//MIDDLEWARES
//1-MIDDLEWARE NATIVO DE EXPRESS
app.use(express.json()); //permite recibir objetos en formato 
app.use(express.urlencoded({ extended: true })); //permite recibir parametros en las rutas

//2- MIDDLEWARES DE TERCEROS
app.use(morgan('dev')) //nos brinda detalles de nuestra terminal 
app.use(cors())// permite recibir peticiones remotas





