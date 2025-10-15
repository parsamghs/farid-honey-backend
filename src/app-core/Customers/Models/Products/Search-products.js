import prisma from '../../../../Config/db.js';

export async function searchProductsRepo(q) {
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
        select: {
          size: true,
          price: true
        }
      }
    }
  });

  return products.map(product => {
    const firstSize = (product.products_size ?? [])[0] || null;

    return {
      id: product.id.toString(),
      name: product.name,
      image_url: product.image_url || null,
      size: firstSize?.size || null,
      price: firstSize?.price || null
    };
  });
}
