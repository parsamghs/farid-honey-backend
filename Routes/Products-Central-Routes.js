import express from 'express';
const router = express.Router();

import GetProducts from './Products/Get-Producrs.js';
import SearchProducts from './Products/Search-Products.js';

router.use('/get-products', GetProducts);
router.use('/search-products', SearchProducts);

export default router;
