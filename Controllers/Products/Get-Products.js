import pool from '../../Config/db.js';
import { formatNumbersintext } from '../../Helpers/Number-formatter.js';

async function getProducts(req, res) {
    try {
        const result = await pool.query(`
            SELECT 
                p.id, 
                p.name, 
                COALESCE(
                    (SELECT image_url 
                     FROM products_images pi 
                     WHERE pi.product_id = p.id AND pi.size = 'یک کیلوئی'
                     LIMIT 1),
                    (SELECT image_url 
                     FROM products_images pi 
                     WHERE pi.product_id = p.id AND pi.size = 'نیم کیلوئی'
                     LIMIT 1)
                ) AS image_url
            FROM products p
            ORDER BY p.id ASC
        `);

        const products = result.rows.map(product => ({
            ...product,
            name: formatNumbersintext(product.name)
        }));

        res.json({ products });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default getProducts;
