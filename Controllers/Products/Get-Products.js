import { getProductsService } from '../../Services/Products/Get-Products.js';

async function getProducts(req, res) {
  try {
    const products = await getProductsService();
    res.json({ products });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'خطای سرور' });
  }
}

export default getProducts;
