import express from 'express';
import { submitGasRequest } from '../controllers/gasRequestController.js';

const gasGetRouter = express.Router();

gasGetRouter.post('/request', submitGasRequest);

export default gasGetRouter;
