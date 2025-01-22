import express from 'express';

import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

import { databaseConnection } from './src/config/database_Connection.js';

import adminRouter from './src/routes/AdminRoutes.js';
import authRouter from './src/routes/authRoutes.js'; // User Auth routes
import smsRouter from './src/routes/smsRoutes.js'; // SMS Routes
import gasRouter from './src/routes/gasRoutes.js'; // Gas Routes
import connectCloudinary from './src/config/Cloudinary.js';
import fetchGasRouter from './src/routes/GasStockRoutes.js';
import outletRouter from './src/routes/OutletRoute.js';



//================================================ App Config ================================================

const app = express();

const PORT = process.env.PORT || 4000;

databaseConnection()

connectCloudinary()

//================================================ Middleware ================================================

app.use(express.json());

app.use(cors());

//================================================ API Endpoints ================================================

app.get('/', (req , res) => res.status(200).send('Server is running'));

app.use('/api/admin' , adminRouter) //localhost:4000/api/admin/add-doctor

app.use('/api/auth', authRouter); // User Auth routes

app.use('/api/sms', smsRouter); // User Sms routes

app.use('/api/gas', gasRouter); // User Gas routes

app.use('/api/gas' , fetchGasRouter);

app.use('/api/outlet' , outletRouter)

//================================================ Listener ================================================

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
