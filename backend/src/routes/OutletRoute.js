import express from  'express';
import { getOutletLocation, outletLogin } from '../controllers/OutletControllers.js';

const outletRouter = express.Router();

outletRouter.post('/login' , outletLogin);

outletRouter.get('/location' , getOutletLocation);

export default outletRouter;