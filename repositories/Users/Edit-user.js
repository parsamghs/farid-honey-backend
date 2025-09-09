import pool from '../../Config/db.js';

const UserRepository = {
  findById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  findByPhoneExcludingUser: async (phone_number, id) => {
    const result = await pool.query(
      "SELECT id FROM users WHERE phone_number = $1 AND id != $2",
      [phone_number, id]
    );
    return result.rows[0];
  },

  updateUser: async (fields, values, id) => {
    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${values.length + 1}
      RETURNING id, name, phone_number, role
    `;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
  }
};

export default UserRepository;
