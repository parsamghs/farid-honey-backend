import express from 'express';
const router = express.Router();
import updateCartItemQuantity from '../../Controllers/Carts/Update-Quantity.js';
import authMiddleware from '../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../Middleware/Role.js';

router.patch('/:id', authMiddleware, roleMiddleware(ROLES.customer), updateCartItemQuantity);

export default router;
