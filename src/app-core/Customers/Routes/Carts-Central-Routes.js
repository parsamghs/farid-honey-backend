import express from 'express';
const router = express.Router();

import addCart from './Carts/Add-Cart.js';
import getCart from './Carts/Get-Cart.js';
import deleteCart from './Carts/Delete-Cart-Item.js';
import updateQuantity from './Carts/Update-Quantity.js';

router.use('/add-cart', addCart);

router.use('/get-cart', getCart);

router.use('/delete-item', deleteCart);

router.use('/update-item', updateQuantity);

export default router;
