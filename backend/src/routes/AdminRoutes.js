import express from 'express';

import AuthAdmin from '../middlewares/authMiddleware.js';

import { addOutlet, adminLogin } from '../controllers/AdminController.js';

const adminRouter = express.Router();

adminRouter.post('/add-outlet' , AuthAdmin , addOutlet);

adminRouter.post('/login' , adminLogin);

export default adminRouter;