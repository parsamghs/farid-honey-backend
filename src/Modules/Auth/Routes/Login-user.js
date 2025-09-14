import express from 'express';
const router = express.Router();
import loginUser from '../Controllers/Login-user.js';

router.post('/', loginUser);

export default router;
