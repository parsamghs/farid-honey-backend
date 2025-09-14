import prisma from '../../../../Config/db.js';

export async function getCartByUserId(userId) {
  return prisma.cart.findFirst({
    where: { user_id: userId },
    select: { id: true }
  });
}

export async function getCartItems(cartId) {
  return prisma.cart_items.findMany({
    where: { cart_id: cartId },
    select: {
      id: true,
      quantity: true,
      price: true,
      size: true,
      products: {
        select: {
          name: true,
          products_images: {
            where: {
              size: { equals: undefined }
            },
            select: {
              image_url: true
            },
            take: 1
          }
        }
      }
    }
  });
}
