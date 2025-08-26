import express from 'express';
const router = express.Router();
import getUserProfile from '../../Controllers/Users/User-Info.js';
import authMiddleware from '../../Middleware/Auth.js';
import { roleMiddleware, ROLES } from '../../Middleware/Role.js';

router.get('/',authMiddleware, roleMiddleware(ROLES.customer), getUserProfile);

export default router;
