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
      products_images: {
        select: {
          image_url: true,
          size: true
        },
        where: {
          size: { in: ['یک کیلوئی', 'نیم کیلوئی'] }
        }
      }
    }
  });

  return products.map(product => {
    const images = product.products_images || [];
    const image = images.find(i => i.size === 'یک کیلوئی') || images.find(i => i.size === 'نیم کیلوئی') || null;

    return {
      id: product.id.toString(),
      name: product.name,
      image_url: image?.image_url || null
    };
  });
}
