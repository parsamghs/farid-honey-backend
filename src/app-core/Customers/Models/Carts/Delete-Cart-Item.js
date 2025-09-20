import prisma from '../../../../Config/db.js';

export async function getCartItemById(itemId, userId) {
  return prisma.cart_items.findFirst({
    where: {
      id: itemId,
      cart: {
        user_id: userId
      }
    },
    select: {
      id: true
    }
  });
}

export async function deleteCartItem(itemId) {
  return prisma.cart_items.delete({
    where: { id: itemId }
  });
}
