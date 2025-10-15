import express from 'express';
const router = express.Router();
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';
import {deleteOrder} from '../../Controllers/Orders/Delete-Order.js';

router.delete('/:orderId', authMiddleware, roleMiddleware(ROLES.admin), deleteOrder);

export default router;