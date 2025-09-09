import pool from '../../Config/db.js';

export async function getOrdersByUser(userId) {
  const query = `
    SELECT o.id as order_id, o.total_price, o.address_id, 
           sa.province, sa.city, sa.address, sa.plate, sa.unit, 
           sa.postal_code, sa.receiver, sa.phone_number
    FROM orders o
    JOIN submit_address sa ON o.address_id = sa.id
    WHERE o.user_id = $1
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
}

export async function getOrderItems(orderId) {
  const query = `
    SELECT oi.id as order_item_id, oi.product_id, oi.quantity, oi.price, 
           p.name as product_name, pi.size, pi.image_url
    FROM orders_item oi
    JOIN products p ON oi.product_id = p.id
    LEFT JOIN products_images pi 
      ON pi.product_id = p.id AND pi.size = oi.size
    WHERE oi.order_id = $1
  `;
  const { rows } = await pool.query(query, [orderId]);
  return rows;
}
