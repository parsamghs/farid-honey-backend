import prisma from '../../../../Config/db.js';

export async function getOrdersByUser(userId) {
  return prisma.orders.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      total_price: true,
      address_id: true,
      submit_address: {
        select: {
          province: true,
          city: true,
          address: true,
          plate: true,
          unit: true,
          postal_code: true,
          receiver: true,
          phone_number: true
        }
      }
    }
  });
}

export async function getOrderItems(orderId) {
  return prisma.orders_item.findMany({
    where: { order_id: orderId },
    select: {
      id: true,
      product_id: true,
      quantity: true,
      price: true,
      size: true,
      products: {     
        select: {
          name: true,
          products_images: {
            where: { size: undefined },
            select: { image_url: true, size: true },
            take: 1
          }
        }
      }
    }
  });
}
