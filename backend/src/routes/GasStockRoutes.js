import express from 'express';
import { getGasDetails } from '../controllers/AddGasStockController.js';

const gasRouter = express.Router();

gasRouter.get('/gas-data' , getGasDetails);

export default gasRouter;