import pool from '../../Config/db.js';

export async function searchProductsRepo(q) {
  const { rows } = await pool.query(`
    SELECT 
      p.id, 
      p.name,
      COALESCE(
        (SELECT pi.image_url 
         FROM products_images pi 
         WHERE pi.product_id = p.id AND pi.size = 'یک کیلوئی'
         LIMIT 1),
        (SELECT pi.image_url 
         FROM products_images pi 
         WHERE pi.product_id = p.id AND pi.size = 'نیم کیلوئی'
         LIMIT 1)
      ) AS image_url
    FROM products p
    WHERE p.name ILIKE $1
       OR p.category ILIKE $1
    ORDER BY p.id ASC
  `, [`%${q}%`]);

  return rows;
}
