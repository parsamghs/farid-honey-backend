import prisma from '../../../../Config/db.js';

export async function getCartItemByUser(itemId, userId) {
  return prisma.cart_items.findFirst({
    where: {
      id: itemId,
      cart: {
        user_id: userId
      }
    },
    select: {
      id: true,
      product_id: true,
      quantity: true,
      price: true,
      unit_price: true
    }
  });
}

export async function updateCartItemQuantityRepo(itemId, quantity, price) {
  return prisma.cart_items.update({
    where: { id: itemId },
    data: {
      quantity,
      price
    }
  });
}

export async function deleteCartItemById(itemId) {
  return prisma.cart_items.delete({
    where: { id: itemId }
  });
}
