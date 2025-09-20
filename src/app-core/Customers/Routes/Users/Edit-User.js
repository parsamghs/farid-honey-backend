import express from 'express';
const router = express.Router();
import updateUser from '../../Controllers/Users/Edit-user.js';
import authMiddleware from '../../../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../../../Middleware/Role.js';

router.patch('/',authMiddleware, roleMiddleware(ROLES.customer), updateUser);

export default router;
