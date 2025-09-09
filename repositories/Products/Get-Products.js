import pool from '../../Config/db.js';

export async function getAllProducts() {
  const { rows } = await pool.query(`
    SELECT 
      p.id, 
      p.name, 
      pi.image_url,
      pi.price
    FROM products p
    LEFT JOIN LATERAL (
      SELECT image_url, price
      FROM products_images pi
      WHERE pi.product_id = p.id AND pi.size IN ('یک کیلوئی', 'نیم کیلوئی')
      ORDER BY 
        CASE 
          WHEN pi.size = 'یک کیلوئی' THEN 1
          WHEN pi.size = 'نیم کیلوئی' THEN 2
          ELSE 3
        END
      LIMIT 1
    ) pi ON true
    ORDER BY p.id ASC;
  `);

  return rows;
}
