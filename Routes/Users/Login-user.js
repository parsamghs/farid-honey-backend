import express from 'express';
const router = express.Router();
import loginUser from '../../Controllers/Users/Login-user.js';

router.post('/', loginUser);

export default router;
