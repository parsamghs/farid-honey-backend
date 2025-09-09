import pool from "../../Config/db.js";

const UserRepository = {
  findById: async (id) => {
    const result = await pool.query(
      "SELECT id, name, phone_number, role FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }
};

export default UserRepository;
