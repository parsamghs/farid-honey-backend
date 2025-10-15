import express from "express";
const router = express.Router();

import orderRoutes from './admin/Routes/Orders-Central-Routes.js';

router.use('/admin/order', orderRoutes);

export default router;