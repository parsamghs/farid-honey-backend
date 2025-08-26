import express from 'express';
const router = express.Router()

import submitorderRoute from './Orders/Submit-Order.js';
import getorderRoute from './Orders/Get-Order.js';

router.use('/submit-order', submitorderRoute);

router.use('/get-order', getorderRoute);

export default router;