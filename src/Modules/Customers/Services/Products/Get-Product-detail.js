import { getProductById, getProductImages } from '../../Models/Products/Get-Product-detail.js';
import { formatNumber } from '../../../../Helpers/Number-formatter.js';

export async function getProductDetailsService(productId) {
  const product = await getProductById(productId);
  if (!product) {
    return null;
  }

  const images = await getProductImages(productId);

  const formattedProduct = {
    ...product,
    id: product.id.toString(),
    images: images.map(img => ({
      ...img,
      price: img.price ? formatNumber(img.price, true) : null,
    })),
  };

  return formattedProduct;
}

