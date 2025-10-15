import { getCartItemsByCartId, getAddressById, createOrderWithItems } from '../../Models/Orders/Submit-Order.js';

export async function submitOrderService(userId, cartId, addressId) {
  const cartItems = await getCartItemsByCartId(cartId);
  if (!cartItems.length) {
    return { error: 'سبد خرید خالی است', status: 400 };
  }

  const address = await getAddressById(addressId, userId);
  if (!address) {
    return { error: 'آدرس یافت نشد', status: 404 };
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);

  const addressData = {
    province: address.province,
    city: address.city,
    address: address.address,
    plate: address.plate,
    unit: address.unit,
    postal_code: address.postal_code,
    receiver: address.receiver,
    phone_number: address.phone_number
  };

  await createOrderWithItems({
    userId,
    totalPrice,
    addressData,
    cartItems
  });

  return { message: 'سفارش با موفقیت ثبت شد', status: 200 };
}