import express from 'express';
const router = express.Router();
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';
import {orderDetails} from '../../Controllers/Orders/Get-Order-Detail.js';

router.get('/:id', authMiddleware, roleMiddleware(ROLES.admin), orderDetails);

export default router;