import express from  'express';
import { getCity, getOutletLocation, outletLogin } from '../controllers/OutletControllers.js';

const outletRouter = express.Router();

outletRouter.post('/login' , outletLogin);

outletRouter.get('/location' , getOutletLocation);

outletRouter.get('/city/:district' , getCity);

export default outletRouter;