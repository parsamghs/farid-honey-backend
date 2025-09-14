import { getProductDetailsService } from '../../Services/Products/Get-Product-detail.js';

async function getProductDetails(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'شناسه محصول الزامی است.' });
    }

    const product = await getProductDetailsService(id);

    if (!product) {
      return res.status(404).json({ message: 'محصولی با این شناسه یافت نشد.' });
    }

    res.json({ product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'خطای سرور' });
  }
}

export default getProductDetails;
