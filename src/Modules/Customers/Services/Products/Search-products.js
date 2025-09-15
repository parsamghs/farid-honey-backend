import prisma from '../../../../Config/db.js';
import { formatNumbersintext, formatNumber } from '../../../../Helpers/Number-formatter.js';

export async function searchProductsService(q) {
  const products = await prisma.products.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } }
      ]
    },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      image_url: true,
      products_size: {
        select: { price: true },
        orderBy: { price: 'desc' },
        take: 1,
      }
    }
  });

  return products.map(product => {
    const maxPrice = product.products_size?.[0]?.price || null;

    return {
      id: product.id.toString(),
      name: formatNumbersintext(product.name),
      image_url: product.image_url || null,
      price: maxPrice ? formatNumber(maxPrice, true) : null 
    };
  });
}
