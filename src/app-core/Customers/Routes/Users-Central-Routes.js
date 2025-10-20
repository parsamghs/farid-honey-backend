import express from 'express';
const router = express.Router();

import RegisterUserRoute from './Users/Register-User.js';
import UserInfoRoure from './Users/User-Info.js';
import EdituserRoute from './Users/Edit-User.js';
import Sendotp from './Users/Send-otp.js';
import Verifyotp from './Users/verify-otp.js';

router.use('/register', RegisterUserRoute);

router.use('/me', UserInfoRoure);

router.use('/edit', EdituserRoute);

router.use('/send-otp', Sendotp);

router.use('/verify-otp', Verifyotp);

export default router;
