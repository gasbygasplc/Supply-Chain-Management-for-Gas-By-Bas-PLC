import express from 'express';

import AuthAdmin from '../middlewares/authMiddleware.js';

import { addOutlet, addOutletManager, adminLogin, getOutletDetails } from '../controllers/AdminController.js';

import { addStock } from '../controllers/AddGasStockController.js';

import upload from '../middlewares/Mutler.js';


const adminRouter = express.Router();

adminRouter.post('/add-outlet' , AuthAdmin , addOutlet);

adminRouter.post('/login' , adminLogin);

adminRouter.post('/add-outlet-manager' , AuthAdmin , addOutletManager);

adminRouter.post('/outlet-stock' , AuthAdmin , getOutletDetails)

adminRouter.post('/add-gas',upload.single('image'), addStock)

export default adminRouter;