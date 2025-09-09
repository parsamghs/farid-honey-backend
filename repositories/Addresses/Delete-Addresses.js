import pool from '../../Config/db.js';

export async function removeAddress(addressId, userId) {
  const query = 'DELETE FROM address WHERE id = $1 AND user_id = $2 RETURNING *';
  const values = [addressId, userId];

  const result = await pool.query(query, values);
  return result.rows;
}
