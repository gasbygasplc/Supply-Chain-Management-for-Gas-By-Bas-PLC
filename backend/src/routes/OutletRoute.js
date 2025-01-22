import express from  'express';
import { outletLogin } from '../controllers/OutletControllers.js';

const outletRouter = express.Router();

outletRouter.post('/login' , outletLogin);

export default outletRouter;