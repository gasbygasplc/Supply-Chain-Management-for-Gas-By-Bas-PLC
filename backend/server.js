import express from 'express'; // this is the express js package

import cors from 'cors'; // this use for cross origin request

import  {databaseConnection}  from './src/config/database_Connection.js'; 

import dotenv from 'dotenv';

import adminRouter from './src/routes/AdminRoutes.js';

import authRouter from './src/routes/authRoutes.js'; // User Auth routes


dotenv.config();

//===================================================== App Config =========================================================
const app = express();

const PORT = 4000;

//===================================================== Middlewares =========================================================

app.use(express.json());

app.use(cors());

//===================================================== DB Config =========================================================

databaseConnection();

//===================================================== API Endpoints =======================================================

app.get("/" , (request , response) => {response.send("Working")});

app.use('/api/admin' , adminRouter);

// Mount the User auth routes
app.use('/api/auth', authRouter);

app.listen(PORT , () => console.log(`Server is running on port ${PORT}`));

