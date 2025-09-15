import prisma from '../../../../Config/db.js';

export async function getAllProducts({ category }) {
  const products = await prisma.products.findMany({
    orderBy: { id: 'asc' },
    where: category ? { category } : {},
    select: {
      id: true,
      name: true,
      category: true,
      products_images: {
        select: {
          image_url: true,
          price: true,
          size: true
        }
      }
    }
  });

  return products.map(product => {
    const images = product.products_images || [];

    images.sort((a, b) => {
      const orderMap = { 'یک کیلوئی': 1 };
      return (orderMap[a.size] || 2) - (orderMap[b.size] || 2);
    });

    const firstImage = images[0] || null;

    return {
      id: product.id.toString(),
      name: product.name,
      category: product.category,
      image_url: firstImage?.image_url || null,
      price: firstImage?.price || null,
      size: firstImage?.size || null
    };
  });
}
