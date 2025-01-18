import express from 'express';

import { scheduleDelivery, updateDeliveryStatus } from '../controllers/deliveryController.js';

const router = express.Router();

router.post('/schedule', scheduleDelivery);

router.put('/status/:deliveryId', updateDeliveryStatus);

export default router;