import pool from '../../Config/db.js';

export async function insertAddress({
  user_id,
  province,
  city,
  address,
  plate,
  unit,
  postal_code,
  receiver,
  phone_number
}) {
  const query = `
    INSERT INTO address 
    (user_id, province, city, address, plate, unit, "Postal code", receiver, phone_number)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  `;
  
  const values = [user_id, province, city, address, plate, unit, postal_code || null, receiver, phone_number];

  return pool.query(query, values);
}
