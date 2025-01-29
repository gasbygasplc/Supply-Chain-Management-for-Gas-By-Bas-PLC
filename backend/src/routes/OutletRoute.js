import express from  'express';
import { gasRequest, getCity, getOutletLocation, getOutletName, outletLogin } from '../controllers/OutletControllers.js';
import authOutlet from '../middlewares/OutletMiddleWare.js';

const outletRouter = express.Router();

outletRouter.post('/login' , outletLogin);

outletRouter.get('/location' , getOutletLocation);

outletRouter.get('/city/:district' , getCity);

outletRouter.get('/outletName/:city' , getOutletName);

outletRouter.get('/gas-request' , authOutlet, gasRequest)

outletRouter.get('/outletName', getOutletName);

export default outletRouter;