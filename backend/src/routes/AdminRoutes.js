import express from 'express';

import AuthAdmin from '../middlewares/authMiddleware.js';

import { addOutlet, addOutletManager, adminLogin, getOutletDetails } from '../controllers/AdminController.js';

const adminRouter = express.Router();

adminRouter.post('/add-outlet' , AuthAdmin , addOutlet);

adminRouter.post('/login' , adminLogin);

adminRouter.post('/add-outlet-manager' , AuthAdmin , addOutletManager);

adminRouter.post('/outlet-stock' , AuthAdmin , getOutletDetails)

export default adminRouter;