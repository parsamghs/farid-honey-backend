import pool from '../../Config/db.js';

export async function getProductPrice(productId, size) {
  const query = `
    SELECT price
    FROM products_images
    WHERE product_id = $1 AND size = $2
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [productId, size]);
  return rows[0];
}

export async function getCartByUser(userId) {
  const { rows } = await pool.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
  return rows[0];
}

export async function createCart(userId) {
  const { rows } = await pool.query(
    'INSERT INTO cart (user_id, created_at) VALUES ($1, NOW()) RETURNING id',
    [userId]
  );
  return rows[0];
}

export async function getCartItem(cartId, productId, size) {
  const { rows } = await pool.query(
    'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2 AND size = $3',
    [cartId, productId, size]
  );
  return rows[0];
}

export async function addCartItem(cartId, productId, size, quantity, price, unitPrice) {
  return pool.query(
    'INSERT INTO cart_items (cart_id, product_id, size, quantity, price, unit_price) VALUES ($1, $2, $3, $4, $5, $6)',
    [cartId, productId, size, quantity, price, unitPrice]
  );
}

export async function updateCartItem(itemId, quantity, totalPrice) {
  return pool.query(
    'UPDATE cart_items SET quantity = $1, price = $2 WHERE id = $3',
    [quantity, totalPrice, itemId]
  );
}
