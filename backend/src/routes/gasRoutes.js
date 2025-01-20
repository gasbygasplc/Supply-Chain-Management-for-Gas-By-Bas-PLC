import express from 'express';
import { submitGasRequest, handleCheckout } from '../controllers/gasRequestController.js';

const gasRouter = express.Router();

gasRouter.post('/request', submitGasRequest);
gasRouter.post('/checkout', handleCheckout);

export default gasRouter;
