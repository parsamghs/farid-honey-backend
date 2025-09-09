import pool from '../../Config/db.js';

export async function getAddressById(addressId, userId) {
  const query = 'SELECT * FROM address WHERE id = $1 AND user_id = $2';
  const { rows } = await pool.query(query, [addressId, userId]);
  return rows[0];
}

export async function updateAddressById(addressId, userId, updatedValues) {
  const query = `
    UPDATE address SET province=$1, city=$2, address=$3, plate=$4, unit=$5, "Postal code"=$6, receiver=$7
    WHERE id=$8 AND user_id=$9 RETURNING *
  `;
  const values = [
    updatedValues.province,
    updatedValues.city,
    updatedValues.address,
    updatedValues.plate,
    updatedValues.unit,
    updatedValues.Postal_code || null,
    updatedValues.receiver,
    addressId,
    userId
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}
