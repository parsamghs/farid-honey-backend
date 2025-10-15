import express from 'express';
const router = express.Router();
import updateAddress from '../../Controllers/Addresses/Edit-Address.js';
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';

router.patch('/:id', authMiddleware, roleMiddleware(ROLES.customer), updateAddress);

export default router;
