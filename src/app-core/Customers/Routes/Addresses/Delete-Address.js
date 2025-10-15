import express from 'express';
const router = express.Router();
import deleteAddress from '../../Controllers/Addresses/Delete-Address.js';
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';

router.delete('/:id', authMiddleware, roleMiddleware(ROLES.customer), deleteAddress);

export default router;
