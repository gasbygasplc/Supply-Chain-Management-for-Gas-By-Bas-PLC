import express from 'express';

import { getGasDetails } from '../controllers/AddGasStockController.js';

const fetchGasRouter = express.Router();

fetchGasRouter.get('/gas/:type' , getGasDetails);

export default fetchGasRouter;