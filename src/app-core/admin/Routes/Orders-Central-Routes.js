import express from 'express';
const router = express.Router();

import getOrders from './Orders/Get-Orders.js' 
import getOrderDetail from './Orders/Get-Order-Detail.js'
import deleteOrder from './Orders/Delete-Order.js';

router.use('/get-orders', getOrders);

router.use('/get-order-detail', getOrderDetail);

router.use('/delete-order', deleteOrder);

export default router;