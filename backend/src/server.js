import express from 'express';
import cors from 'cors';

//===================================================== App Config =========================================================
const app = express();

const PORT = 4000;

//===================================================== Middlewares =========================================================
app.use(express.json());
app.use(cors());

//===================================================== API Endpoints =======================================================

app.get("/" , (request , response) => {response.send("API Working")});

app.listen(PORT , () => console.log(`Server is running on port ${PORT}`));
