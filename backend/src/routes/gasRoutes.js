import express from 'express';
import { updateGasRequestStatus } from '../controllers/gasRequestController.js';
import { getGasOrders, submitGasRequest, handleCheckout } from '../controllers/gasRequestController.js';
import { getPendingOrders } from "../controllers/gasRequestController.js";
import { cancelGasOrder } from "../controllers/gasRequestController.js";

const gasRouter = express.Router();

gasRouter.post('/request', submitGasRequest);
gasRouter.post('/checkout', handleCheckout);
gasRouter.put('/update-status', updateGasRequestStatus);
gasRouter.post('/orders', getGasOrders);
gasRouter.get('/pending-orders', getPendingOrders);
gasRouter.put("/cancel", cancelGasOrder);


export default gasRouter;
