import prisma from '../../../../Config/db.js';

export async function getAllProducts() {
  const products = await prisma.products.findMany({
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      products_images: {
        where: { size: { in: ['یک کیلوئی', 'نیم کیلوئی'] } },
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
      const orderMap = { 'یک کیلوئی': 1, 'نیم کیلوئی': 2 };
      return (orderMap[a.size] || 3) - (orderMap[b.size] || 3);
    });
    const firstImage = images[0] || null;

    return {
      id: product.id.toString(),
      name: product.name,
      image_url: firstImage?.image_url || null,
      price: firstImage?.price || null
    };
  });
}
