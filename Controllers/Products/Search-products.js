import pool from '../../Config/db.js';
import { formatNumbersintext } from '../../Helpers/Number-formatter.js';

async function searchProducts(req, res) {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: 'عبارت جستجو الزامی است.' });
        }

        const result = await pool.query(`
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

        if (result.rows.length === 0) {
            return res.status(200).json({ message: 'محصولی یافت نشد.' });
        }

        const products = result.rows.map(product => ({
            id: product.id,
            name: formatNumbersintext(product.name),
            image_url: product.image_url
        }));

        res.json({ products });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default searchProducts;
