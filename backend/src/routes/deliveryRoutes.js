import express from 'express';

import { scheduleDeliveryToOutlet, updateDeliveryStatus, dispatchDelivery } from '../controllers/deliveryController.js';


const router = express.Router();

//**************// Route for scheduling a delivery //**************//

router.post('/schedule', scheduleDeliveryToOutlet);


//**************// Route for updating delivery status //**************//
router.put('/status/:deliveryId', updateDeliveryStatus);


//**************// Route for dispatching a delivery //**************//
router.put('/dispatch/:deliveryId', dispatchDelivery);


export default router;