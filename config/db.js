const { Pool } = require('pg');
require('dotenv/config');

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
  max: 10
});

pool
  .connect()
  .then(client => {
    return client
      .query('SELECT NOW()')
      .then(res => {
        console.log('✅ Database connected successfully at', res.rows[0].now);
        client.release();
      })
      .catch(err => {
        console.error('❌ Database connection test failed:', err.message);
        client.release();
      });
  })
  .catch(err => {
    console.error('❌ Could not connect to the database:', err.message);
  });

module.exports = pool;
