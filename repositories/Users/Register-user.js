import pool from "../../Config/db.js";

const UserRepository = {
  findByPhone: async (phone_number) => {
    const result = await pool.query(
      "SELECT * FROM users WHERE phone_number = $1",
      [phone_number]
    );
    return result.rows[0];
  },

  create: async ({ name, phone_number, password, role }) => {
    const result = await pool.query(
      `INSERT INTO users (name, phone_number, password, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, phone_number, role`,
      [name, phone_number, password, role]
    );
    return result.rows[0];
  }
};

export default UserRepository;
