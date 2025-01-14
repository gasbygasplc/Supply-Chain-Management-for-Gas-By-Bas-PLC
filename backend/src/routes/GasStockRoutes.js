import express from 'express';

import { getGasDetails } from '../controllers/AddGasStockController.js';

const fetchGasRouter = express.Router();

fetchGasRouter.get('/gas-data' , getGasDetails);

export default fetchGasRouter;