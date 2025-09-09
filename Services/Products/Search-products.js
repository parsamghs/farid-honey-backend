import { searchProductsRepo } from '../../repositories/Products/Search-products.js';
import { formatNumbersintext } from '../../Helpers/Number-formatter.js';

export async function searchProductsService(q) {
  const products = await searchProductsRepo(q);

  return products.map(product => ({
    id: product.id,
    name: formatNumbersintext(product.name),
    image_url: product.image_url,
  }));
}
