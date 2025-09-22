import { getOrdersByUser, getOrderItems } from '../../Models/Orders/Get-Order.js';
import { formatNumber, formatNumbersintext } from '../../../../Helpers/Number-formatter.js';

export async function getUserOrdersService(userId) {
  const ordersResult = await getOrdersByUser(userId);
  if (!ordersResult.length) return [];

  const orders = [];

  for (const order of ordersResult) {
    const itemsResult = await getOrderItems(order.id);

    const items = itemsResult.map(item => ({
      order_item_id: item.id.toString(),
      product_id: item.product_id.toString(),
      name: item.products.name,
      quantity: formatNumber(parseInt(item.quantity), false),
      price: formatNumber(parseInt(item.price)),
      size: item.size,
      image_url: item.products.image_url || null
    }));

    const addr = order.submit_address;

    orders.push({
      order_id: order.id.toString(),
      total_price: formatNumber(parseInt(order.total_price)),
      address: {
        province: addr.province,
        city: addr.city,
        address: formatNumbersintext(addr.address),
        plate: formatNumbersintext(addr.plate),
        unit: formatNumbersintext(addr.unit),
        postal_code: addr.postal_code ? formatNumbersintext(addr.postal_code) : null,
        receiver: addr.receiver,
        phone_number: formatNumbersintext(addr.phone_number)
      },
      items
    });
  }

  return orders;
}
