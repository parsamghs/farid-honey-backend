import pool from '../../Config/db.js';
import { formatNumber, formatNumbersintext } from '../../Helpers/Number-formatter.js';

async function getUserOrders(req, res) {
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });
  }

  try {
    const ordersResult = await pool.query(
      `SELECT o.id as order_id, o.total_price, o.address_id, sa.province, sa.city, sa.address,
              sa.plate, sa.unit, sa.postal_code, sa.receiver, sa.phone_number
       FROM orders o
       JOIN submit_address sa ON o.address_id = sa.id
       WHERE o.user_id = $1`,
      [user_id]
    );

    if (ordersResult.rows.length === 0) {
      return res.status(200).json({ message: 'سفارشی یافت نشد', orders: [] });
    }

    const orders = [];

    for (const order of ordersResult.rows) {
      const itemsResult = await pool.query(
        `SELECT oi.id as order_item_id, oi.product_id, oi.quantity, oi.price, p.name as product_name, pi.size, pi.image_url
         FROM orders_item oi
         JOIN products p ON oi.product_id = p.id
         LEFT JOIN products_images pi 
           ON pi.product_id = p.id AND pi.size = oi.size
         WHERE oi.order_id = $1`,
        [order.order_id]
      );

      const items = itemsResult.rows.map(item => ({
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

    res.status(200).json({ orders });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در دریافت سفارش‌ها' });
  }
}

export default getUserOrders;
