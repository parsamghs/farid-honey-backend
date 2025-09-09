import { getOrdersByUser, getOrderItems } from '../../repositories/Orders/Get-Order.js';
import { formatNumber, formatNumbersintext } from '../../Helpers/Number-formatter.js';

export async function getUserOrdersService(userId) {
  const ordersResult = await getOrdersByUser(userId);

  if (!ordersResult.length) {
    return [];
  }

  const orders = [];

  for (const order of ordersResult) {
    const itemsResult = await getOrderItems(order.order_id);

    const items = itemsResult.map(item => ({
      order_item_id: item.order_item_id,
      product_id: item.product_id,
      name: item.product_name,
      quantity: formatNumber(parseInt(item.quantity), false),
      price: formatNumber(parseInt(item.price)),
      size: item.size,
      image_url: item.image_url
    }));

    orders.push({
      order_id: order.order_id,
      total_price: formatNumber(parseInt(order.total_price)),
      address: {
        province: order.province,
        city: order.city,
        address: formatNumbersintext(order.address),
        plate: formatNumbersintext(order.plate),
        unit: formatNumbersintext(order.unit),
        postal_code: order.postal_code ? formatNumbersintext(order.postal_code) : null,
        receiver: order.receiver,
        phone_number: formatNumbersintext(order.phone_number)
      },
      items
    });
  }

  return orders;
}
