import express from 'express';
const router = express.Router();

import RegisterUserRoute from './Users/Register-User.js';
import LoginUserRoute from './Users/Login-user.js';
import UserInfoRoure from './Users/User-Info.js';

router.use('/register-user', RegisterUserRoute);

router.use('/login', LoginUserRoute);

router.use('/me', UserInfoRoure);

export default router;
