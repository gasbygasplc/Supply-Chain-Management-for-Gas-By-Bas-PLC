import express from 'express';

import { getGasDetails, getOrganziationGasDetails } from '../controllers/AddGasStockController.js';

const fetchGasRouter = express.Router();

fetchGasRouter.get('/:type' , getGasDetails);

fetchGasRouter.get("/organization-gas", getOrganziationGasDetails);

export default fetchGasRouter;