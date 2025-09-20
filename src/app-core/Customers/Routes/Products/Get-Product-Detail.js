import express from 'express';
const router = express.Router();
import getProductDetails from '../../Controllers/Products/Get-Product-detail.js';

router.get('/:id', getProductDetails);

export default router;
