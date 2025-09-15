import { getAllProducts } from '../../Models/Products/Get-Products.js';
import { formatNumbersintext, formatNumber } from '../../../../Helpers/Number-formatter.js';

export async function getProductsService({ category }) {
  const products = await getAllProducts({ category });

  return products.map(product => ({
    ...product,
    name: formatNumbersintext(product.name),
    price: formatNumber(product.price),
  }));
}