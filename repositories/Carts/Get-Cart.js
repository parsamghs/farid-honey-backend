import pool from '../../Config/db.js';

export async function getCartByUserId(userId) {
  const { rows } = await pool.query('SELECT id FROM cart WHERE user_id = $1', [userId]);
  return rows[0];
}

export async function getCartItems(cartId) {
  const query = `
    SELECT 
        ci.id AS cart_item_id, 
        p.name, 
        ci.quantity, 
        ci.price, 
        ci.size,
        pi.image_url
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    LEFT JOIN products_images pi 
      ON pi.product_id = ci.product_id AND pi.size = ci.size
    WHERE ci.cart_id = $1
  `;
  const { rows } = await pool.query(query, [cartId]);
  return rows;
}
