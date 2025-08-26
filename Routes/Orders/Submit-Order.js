import express from 'express';
const router = express.Router();
import submitOrder from '../../Controllers/Orders/Submit-Order.js';
import authMiddleware from '../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../Middleware/Role.js';

router.post('/:cart_id', authMiddleware, roleMiddleware(ROLES.customer), submitOrder);

export default router;
