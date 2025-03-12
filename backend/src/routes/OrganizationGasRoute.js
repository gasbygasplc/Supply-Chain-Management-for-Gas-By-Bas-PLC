import express from 'express'
import { getOrganziationGasDetails } from '../controllers/OrganizationGas.js';

const organizationRouter = express.Router();

organizationRouter.get('organization-gas' , getOrganziationGasDetails);

export default  organizationRouter;