import express from 'express';
const router = express.Router();

import RegisterUserRoute from './Users/Register-User.js';
import LoginUserRoute from './Users/Login-user.js';
import UserInfoRoure from './Users/User-Info.js';
import edituserRoute from './Users/Edit-User.js';

router.use('/register', RegisterUserRoute);

router.use('/login', LoginUserRoute);

router.use('/me', UserInfoRoure);

router.use('/edit', edituserRoute);

export default router;
