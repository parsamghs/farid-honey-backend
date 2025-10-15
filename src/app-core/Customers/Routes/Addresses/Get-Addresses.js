import express from 'express';
const router = express.Router();
import getUserAddresses from '../../Controllers/Addresses/Get-Addresses.js';
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';

router.get('/', authMiddleware, roleMiddleware(ROLES.customer), getUserAddresses);

export default router;
