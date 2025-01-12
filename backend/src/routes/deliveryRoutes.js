import express from 'express';
import { scheduleDelivery, updateDeliveryStatus, getDeliveryDetails } from '../controllers/deliveryController.js';

const router = express.Router();

router.post('/schedule', scheduleDelivery);
router.put('/status/:deliveryId', updateDeliveryStatus);
router.get('/details/:deliveryId', getDeliveryDetails);

export default router;
