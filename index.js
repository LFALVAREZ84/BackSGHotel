import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import connectDb from './src/database/db';
import userRoutes from './src/routes/userRoutes';
import roomRoutes from './src/routes/roomRoutes'; // Importa las rutas de habitaciones

const app = express();

app.set('port', process.env.PORT);

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

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/users', userRoutes); // Rutas de usuarios
app.use('/api/rooms', roomRoutes); // Rutas de habitaciones

export default app;
