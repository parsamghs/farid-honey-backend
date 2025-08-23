import express from 'express';
const router = express.Router();

import GetProducts from './Products/Get-Producrs.js';
import SearchProducts from './Products/Search-Products.js';
import productinfo from './Products/Get-Product-Detail.js';

router.use('/get-products', GetProducts);

router.use('/search-products', SearchProducts);

router.use('/product-info', productinfo);

export default router;
