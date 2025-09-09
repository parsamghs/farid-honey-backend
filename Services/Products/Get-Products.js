import { getAllProducts } from '../../repositories/Products/Get-Products.js';
import { formatNumbersintext, formatNumber } from '../../Helpers/Number-formatter.js';

export async function getProductsService() {
  const products = await getAllProducts();

  return products.map(product => ({
    ...product,
    name: formatNumbersintext(product.name),
    price: formatNumber(product.price),
  }));
}
