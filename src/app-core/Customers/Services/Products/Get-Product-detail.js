import { getProductById } from '../../Models/Products/Get-Product-detail.js';
import { formatNumber, formatNumbersintext } from '../../../../Helpers/Number-formatter.js';

export async function getProductDetailsService(productId) {
  const product = await getProductById(productId);
  if (!product) return null;

  const sizes = (product.sizes ?? []).map(p => ({
    ...p,
    size: formatNumbersintext(p.size), 
    price: p.price ? formatNumber(p.price, true) : null,
  }));

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    image_url: product.image_url || null,
    sizes,
  };
}
