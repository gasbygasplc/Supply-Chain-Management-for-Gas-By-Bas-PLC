import express from 'express'; // this is the express js package

import cors from 'cors'; // this use for cross origin request

import  {databaseConnection}  from './config/database_Connection.js'; 

import dotenv from 'dotenv';

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

app.listen(PORT , () => console.log(`Server is running on port ${PORT}`));

