import prisma from '../../../../Config/db.js';
import moment from 'moment-timezone';
import 'moment-jalaali';

export async function getCartItemsByCartId(cartId) {
  return prisma.cart_items.findMany({
    where: { cart_id: cartId }
  });
}

export async function getAddressById(addressId, userId) {
  return prisma.address.findFirst({
    where: {
      id: addressId,
      user_id: userId
    }
  });
}

export async function createOrderWithItems({ userId, totalPrice, addressData, cartItems }) {
  const nowUtc = new Date();
  const nowTehranTime = moment().tz("Asia/Tehran").toDate();

  return prisma.$transaction(async (prisma) => {
    const submitAddress = await prisma.submit_address.create({
      data: addressData
    });

    const order = await prisma.orders.create({
      data: {
        total_price: totalPrice.toString(),
        user_id: userId,
        address_id: submitAddress.id,
        order_date: nowUtc,       
        order_time: nowTehranTime 
      }
    });

    for (const item of cartItems) {
      await prisma.orders_item.create({
        data: {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity.toString(),
          price: item.price.toString(),
          size: item.size
        }
      });
    }

    await prisma.cart_items.deleteMany({
      where: { cart_id: cartItems[0]?.cart_id }
    });

    return { orderId: order.id, submitAddressId: submitAddress.id };
  });
}

