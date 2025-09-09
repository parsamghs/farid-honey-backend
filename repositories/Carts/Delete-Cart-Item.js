import pool from '../../Config/db.js';

export async function getCartItemById(itemId, userId) {
  const query = `
    SELECT ci.id
    FROM cart_items ci
    JOIN cart c ON ci.cart_id = c.id
    WHERE ci.id = $1 AND c.user_id = $2
  `;
  const { rows } = await pool.query(query, [itemId, userId]);
  return rows[0];
}

export async function deleteCartItem(itemId) {
  return pool.query('DELETE FROM cart_items WHERE id = $1', [itemId]);
}
