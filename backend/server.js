import express from 'express';

import cros from 'cors';

//=========================================================== APP CONFIG ===========================================================//
const app = express();

const PORT = 4000;

//=========================================================== MIDDLEWARES ===========================================================//

app.use(express.json()); // when we get the request from front end 2 backend that will be parsed as json

app.use(cros()); // to avoid cors error & we can access the backend from any frontend / Domain

app.get()