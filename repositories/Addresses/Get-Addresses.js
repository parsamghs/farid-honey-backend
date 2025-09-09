import pool from '../../Config/db.js';

export async function getAddressesByUserId(userId) {
  const query = `
    SELECT id, province, city, address, plate, unit, "Postal code" AS postal_code, receiver, phone_number
    FROM address
    WHERE user_id = $1
    ORDER BY id DESC
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
}
