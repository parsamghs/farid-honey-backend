import prisma from '../../../../Config/db.js';

export async function getAllProducts({ category }) {
  const products = await prisma.products.findMany({
    orderBy: { id: 'asc' },
    where: category ? { category } : {},
    select: {
      id: true,
      name: true,
      category: true,
      image_url: true,
      products_size: { 
        select: {
          price: true
        }
      }
    }
  });

  return products.map(product => {
    const prices = product.products_size.map(p => parseFloat(p.price || 0));
    const maxPrice = prices.length ? Math.max(...prices) : null;

    return {
      id: product.id.toString(),
      name: product.name,
      category: product.category,
      image_url: product.image_url || null,
      price: maxPrice?.toString() || null
    };
  });
}
