import express from 'express';
const router = express.Router();
import addAddress from '../../Controllers/Addresses/Add-Address.js';
import authMiddleware from '../../Middleware/Auth.js';
import  { roleMiddleware } from '../../Middleware/Role.js';
import { ROLES } from '../../Middleware/Role.js';

router.post('/',authMiddleware, roleMiddleware(ROLES.customer), addAddress);

export default router;
