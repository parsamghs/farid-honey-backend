import express from 'express';
const router = express.Router();
import loginUser from '../Controllers/Login-user.js';
import refreshtoken from '../Controllers/Refresh-Token.js';
import logoutUser from '../Controllers/Logout-User.js';

router.post('/login', loginUser);

router.post('/refresh-token', refreshtoken);

router.post('/logout', logoutUser);

export default router;
