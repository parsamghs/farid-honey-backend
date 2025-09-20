import express from 'express';
const router = express.Router();
import getCart from '../../Controllers/Carts/Get-Cart.js';
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';

router.get('/', authMiddleware, roleMiddleware(ROLES.customer), getCart);

export default router;
