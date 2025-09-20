import express from 'express';
const router = express.Router();
import getProducts from '../../Controllers/Products/Get-Products.js';

router.get('/', getProducts);

export default router;
