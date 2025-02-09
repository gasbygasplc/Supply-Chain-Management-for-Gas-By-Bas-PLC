import express from 'express';
import { searchOutlets, getGasRequestsForOutlet } from '../controllers/DeliveryScheduleController.js';
import { createDeliverySchedule } from '../controllers/DeliveryScheduleController.js';
import { getDeliverySchedules } from '../controllers/DeliveryScheduleController.js';
import { updateDeliveryStatus } from '../controllers/DeliveryScheduleController.js';
import { updateGasRequestsOnDeliveryStatusChange } from "../controllers/DeliveryScheduleController.js";  

  
const deliveryScheduleRouter = express.Router();

deliveryScheduleRouter.get('/search-outlets', searchOutlets);
deliveryScheduleRouter.get('/outlet/:outletId/gas-requests', getGasRequestsForOutlet);  
deliveryScheduleRouter.post('/create', createDeliverySchedule);  
deliveryScheduleRouter.get('/', getDeliverySchedules);  
deliveryScheduleRouter.patch('/:scheduleId/status', updateDeliveryStatus);  
deliveryScheduleRouter.post("/update-requests", updateGasRequestsOnDeliveryStatusChange);
      
       
export default deliveryScheduleRouter;
     