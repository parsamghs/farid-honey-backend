import prisma from '../../../../Config/db.js';

export async function getProductPrice(productId, size) {
  return prisma.products_size.findFirst({
    where: {
      product_id: productId,
      size: size
    },
    select: {
      price: true
    }
  });
}

export async function getCartByUser(userId) {
  return prisma.cart.findFirst({
    where: { user_id: userId }
  });
}

export async function createCart(userId) {
  return prisma.cart.create({
    data: {
      user_id: userId,
      created_at: new Date()
    },
    select: { id: true }
  });
}

export async function getCartItem(cartId, productId, size) {
  return prisma.cart_items.findFirst({
    where: {
      cart_id: cartId,
      product_id: productId,
      size: size
    }
  });
}

export async function addCartItem(cartId, productId, size, quantity, price, unitPrice) {
  return prisma.cart_items.create({
    data: {
      cart_id: cartId,
      product_id: productId,
      size,
      quantity,
      price,
      unit_price: unitPrice
    }
  });
}

export async function updateCartItem(itemId, quantity, totalPrice) {
  return prisma.cart_items.update({
    where: { id: itemId },
    data: {
      quantity,
      price: totalPrice
    }
  });
}
