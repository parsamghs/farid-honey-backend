import { searchProductsService } from '../../Services/Products/Search-products.js';

async function searchProducts(req, res) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'عبارت جستجو الزامی است.' });
    }

    const products = await searchProductsService(q);

    if (products.length === 0) {
      return res.status(200).json({ message: 'محصولی یافت نشد.' });
    }

    res.json({ products });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'خطای سرور' });
  }
}

export default searchProducts;
