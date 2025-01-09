import express from 'express';

import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

import { databaseConnection } from './src/config/database_Connection.js';

import adminRouter from './src/routes/AdminRoutes.js';

//================================================ App Config ================================================

const app = express();

const PORT = process.env.PORT || 4000;

databaseConnection()

//================================================ Middleware ================================================

app.use(express.json());

app.use(cors());

//================================================ API Endpoints ================================================

app.get('/', (req , res) => res.status(200).send('Server is running'));

app.use('/api/admin' , adminRouter) //localhost:4000/api/admin/add-doctor

//================================================ Listener ================================================

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
