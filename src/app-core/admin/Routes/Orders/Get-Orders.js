import express from 'express';
const router = express.Router();
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';
import {listOrders} from '../..//Controllers/Orders/Get-Orders.js';

router.get('/', authMiddleware, roleMiddleware(ROLES.admin), listOrders);

export default router;