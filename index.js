// src/index.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';

// Cambia la importación de connectDb para que utilice import en lugar de require
import connectDb from './src/database/db';

// Importa las rutas de usuarios
import userRoutes from './src/routes/userRoutes';

console.log('Hello World BACK END 46i');

// Crear una instancia de express
const app = express();

// Configurar el puerto en el que se va a ejecutar el servidor
app.set('port', process.env.PORT);

// Conectar a la base de datos
const initApp = async () => {
  try {
    await connectDb();
    app.listen(app.get('port'), () => {
      console.log(`BackEnd46i listening to PORT: ${app.get('port')}`);
    }).on('error', (error) => {
      console.log('ERROR:', error);
      process.exit(1);
    });
  } catch (error) {
    console.log('ERROR:', error);
    process.exit(1);
  }
};

initApp();

// Middlewares
app.use(express.json());

// Habilita CORS
app.use(cors());

// Muestra los logs en la consola
app.use(morgan('dev'));

// Rutas
app.use('/api/users', userRoutes);


export default app;


