import express from 'express';

import AuthAdmin from '../middlewares/authMiddleware.js';

import { addOutlet, addOutletManager, adminLogin, getOutletDetails } from '../controllers/AdminController.js';

import { addStock, getGasStock } from '../controllers/AddGasStockController.js';

import upload from '../middlewares/Mutler.js';
import { organizationGasAdd } from '../controllers/organizationGasAddController.js';



const adminRouter = express.Router();

adminRouter.post('/add-outlet' , AuthAdmin , addOutlet);

adminRouter.post('/login' , adminLogin);

adminRouter.post('/add-outlet-manager' , AuthAdmin , addOutletManager);

adminRouter.post('/outlet-stock' , AuthAdmin , getOutletDetails)

adminRouter.post('/get-gas-stock' , AuthAdmin , getGasStock)

adminRouter.post('/add-gas',upload.single('image'), addStock)

adminRouter.post('/add-organization-gas', upload.single('image'), organizationGasAdd)

export default adminRouter;