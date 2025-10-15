import express from "express";
const router = express.Router();

import addressesRoute from './Customers/Routes/Addresses-Central-Routes.js';
import usersRoute from './Customers/Routes/Users-Central-Routes.js';
import cartsRoute from './Customers/Routes/Carts-Central-Routes.js';
import ordersRoute from './Customers/Routes/Orders-Central-Routes.js';
import productsRoute from './Customers/Routes/Products-Central-Routes.js';

router.use('/customer/address', addressesRoute);
router.use('/customer/user', usersRoute);
router.use('/customer/cart', cartsRoute);
router.use('/customer/order', ordersRoute);
router.use('/customer/products', productsRoute);

export default router;
