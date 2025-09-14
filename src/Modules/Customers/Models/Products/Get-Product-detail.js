import prisma from '../../../../Config/db.js';

export async function getProductById(productId) {
  return prisma.products.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      category: true
    }
  });
}

export async function getProductImages(productId) {
  const images = await prisma.products_images.findMany({
    where: { product_id: productId },
    select: {
      id: true,
      image_url: true,
      size: true,
      price: true
    }
  });

  const orderMap = { 'یک کیلوئی': 1, 'نیم کیلوئی': 2 };
  images.sort((a, b) => (orderMap[a.size] || 3) - (orderMap[b.size] || 3));

  return images.map(img => ({
    ...img,
    id: img.id.toString()
  }));
}

