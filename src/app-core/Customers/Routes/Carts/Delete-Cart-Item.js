import express from 'express';
const router = express.Router();
import removeFromCart from '../../Controllers/Carts/Delete-Cart-Item.js';
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';

router.delete('/:id', authMiddleware, roleMiddleware(ROLES.customer), removeFromCart);

export default router;
