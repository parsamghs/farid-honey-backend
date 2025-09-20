import express from 'express';
const router = express.Router();
import searchProducts from '../../Controllers/Products/Search-products.js';

router.get('/', searchProducts);

export default router;
