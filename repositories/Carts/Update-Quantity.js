import pool from '../../Config/db.js';

export async function getCartItemByUser(itemId, userId) {
  const query = `
    SELECT ci.id, ci.product_id, ci.quantity, ci.price, ci.unit_price
    FROM cart_items ci
    JOIN cart c ON ci.cart_id = c.id
    WHERE ci.id = $1 AND c.user_id = $2
  `;
  const { rows } = await pool.query(query, [itemId, userId]);
  return rows[0];
}

export async function updateCartItemQuantityRepo(itemId, quantity, price) {
  return pool.query(
    'UPDATE cart_items SET quantity = $1, price = $2 WHERE id = $3',
    [quantity, price, itemId]
  );
}

export async function deleteCartItemById(itemId) {
  return pool.query('DELETE FROM cart_items WHERE id = $1', [itemId]);
}
