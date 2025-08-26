import express from 'express';
const router = express.Router();
import getUserOrders from '../../Controllers/Orders/Get-Order.js';
import authMiddleware from '../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../Middleware/Role.js';

router.get('/', authMiddleware, roleMiddleware(ROLES.customer), getUserOrders);

export default router;
