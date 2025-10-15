import express from 'express';
const router = express.Router();
import registerUser from '../../Controllers/Users/Register-user.js';

router.post('/', registerUser);

export default router;
