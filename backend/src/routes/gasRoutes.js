import express from 'express';
import { submitGasRequest } from '../controllers/gasRequestController.js';

const router = express.Router();

router.post('/request', submitGasRequest);

export default router;
