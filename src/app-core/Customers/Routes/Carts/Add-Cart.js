import express from 'express';
const router = express.Router();
import addCart from '../../Controllers/Carts/Add-Cart.js';
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';

router.post('/', authMiddleware, roleMiddleware(ROLES.customer), addCart);

export default router;
