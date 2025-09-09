import pool from '../../Config/db.js';

const UserRepository = {
  findByPhone: async (phone_number) => {
    const result = await pool.query(
      'SELECT * FROM users WHERE phone_number = $1',
      [phone_number]
    );
    return result.rows[0];
  }
};

export default UserRepository;
