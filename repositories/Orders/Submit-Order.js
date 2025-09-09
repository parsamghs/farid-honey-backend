import pool from '../../Config/db.js';

export async function getCartItemsByCartId(client, cartId) {
  const { rows } = await client.query('SELECT * FROM cart_items WHERE cart_id = $1', [cartId]);
  return rows;
}

export async function getAddressById(client, addressId, userId) {
  const { rows } = await client.query(
    'SELECT * FROM address WHERE id = $1 AND user_id = $2',
    [addressId, userId]
  );
  return rows;
}

export async function insertSubmitAddress(client, address) {
  const query = `
    INSERT INTO submit_address 
      (province, city, address, plate, unit, postal_code, receiver, phone_number)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING id
  `;
  const { rows } = await client.query(query, [
    address.province,
    address.city,
    address.address,
    address.plate,
    address.unit,
    address.postal_code,
    address.receiver,
    address.phone_number,
  ]);
  return rows[0].id;
}

export async function insertOrder(client, totalPrice, userId, submitAddressId) {
  const query = `
    INSERT INTO orders (total_price, user_id, address_id) 
    VALUES ($1, $2, $3) 
    RETURNING id
  `;
  const { rows } = await client.query(query, [totalPrice.toString(), userId, submitAddressId]);
  return rows[0].id;
}

export async function insertOrderItem(client, orderId, item) {
  const query = `
    INSERT INTO orders_item (order_id, product_id, quantity, price, size)
    VALUES ($1,$2,$3,$4,$5)
  `;
  await client.query(query, [
    orderId,
    item.product_id,
    item.quantity.toString(),
    item.price.toString(),
    item.size,
  ]);
}

export async function clearCartItems(client, cartId) {
  await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
}

export async function getClient() {
  return await pool.connect();
}
