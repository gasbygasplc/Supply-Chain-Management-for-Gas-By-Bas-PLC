import express from  'express';
import { fetchDeliveryShedule, gasRequest, getCity, getOutletLocation, outletLogin, sendGasRequestForDeliveryShedule } from '../controllers/OutletControllers.js';
import authOutlet from '../middlewares/OutletMiddleWare.js';
import { getOutletName } from "../controllers/OutletControllers.js";


const outletRouter = express.Router();

outletRouter.post('/login' , outletLogin);

outletRouter.get('/location' , getOutletLocation);

outletRouter.get('/city/:district' , getCity);

outletRouter.get('/outletName/:city' , getOutletName);

outletRouter.get('/gas-request' , authOutlet, gasRequest);

outletRouter.post('/request-delivery' , authOutlet , sendGasRequestForDeliveryShedule);

outletRouter.get('/fetch-gas-request' , authOutlet , fetchDeliveryShedule);

outletRouter.get('/outletName', getOutletName);

outletRouter.get("/api/outlets/:city", getOutletName);


export default outletRouter;