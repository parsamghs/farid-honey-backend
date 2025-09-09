import pool from '../../Config/db.js';

export async function getProductById(productId) {
  const { rows } = await pool.query(
    `SELECT id, name, description, category
     FROM products 
     WHERE id = $1`,
    [productId]
  );
  return rows[0];
}

export async function getProductImages(productId) {
  const { rows } = await pool.query(
    `SELECT id, image_url, size, price
     FROM products_images
     WHERE product_id = $1
     ORDER BY 
        CASE 
            WHEN size = 'یک کیلوئی' THEN 1
            WHEN size = 'نیم کیلوئی' THEN 2
            ELSE 3
        END ASC`,
    [productId]
  );
  return rows;
}
