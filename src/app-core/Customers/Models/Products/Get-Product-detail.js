import prisma from '../../../../Config/db.js';

export async function getProductById(productId) {
  const product = await prisma.products.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      image_url: true,
      products_size: {
        select: {
          id: true,
          size: true,
          price: true
        }
      }
    }
  });

  if (!product) return null;

  const sizes = (product.products_size ?? []).map(p => ({
    id: p.id.toString(),
    size: p.size,
    price: p.price
  }));

  return {
    id: product.id.toString(),
    name: product.name,
    description: product.description,
    category: product.category,
    image_url: product.image_url || null,
    sizes
  };
}
