import express from  'express';
import { getCity, getOutletLocation, getOutletName, outletLogin } from '../controllers/OutletControllers.js';

const outletRouter = express.Router();

outletRouter.post('/login' , outletLogin);

outletRouter.get('/location' , getOutletLocation);

outletRouter.get('/city/:district' , getCity);

outletRouter.get('/outletName' , getOutletName);

export default outletRouter;