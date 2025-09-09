import {
  getCartItemsByCartId,
  getAddressById,
  insertSubmitAddress,
  insertOrder,
  insertOrderItem,
  clearCartItems,
  getClient,
} from '../../repositories/Orders/Submit-Order.js';

export async function submitOrderService(userId, cartId, addressId) {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    const cartItems = await getCartItemsByCartId(client, cartId);
    if (!cartItems.length) {
      await client.query('ROLLBACK');
      return { error: 'سبد خرید خالی است', status: 400 };
    }

    const addressRows = await getAddressById(client, addressId, userId);
    if (!addressRows.length) {
      await client.query('ROLLBACK');
      return { error: 'آدرس یافت نشد', status: 404 };
    }

    const address = addressRows[0];
    const submitAddressId = await insertSubmitAddress(client, address);

    const totalPrice = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);

    const orderId = await insertOrder(client, totalPrice, userId, submitAddressId);

    for (const item of cartItems) {
      await insertOrderItem(client, orderId, item);
    }

    await clearCartItems(client, cartId);

    await client.query('COMMIT');

    return { message: 'سفارش با موفقیت ثبت شد', status: 200 };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
