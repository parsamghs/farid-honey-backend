import pool from '../../Config/db.js';
import { formatNumbersintext, formatNumber } from '../../Helpers/Number-formatter.js';

async function getProducts(req, res) {
    try {
        const result = await pool.query(`
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

        const products = result.rows.map(product => ({
            ...product,
            name: formatNumbersintext(product.name),
            price: formatNumber(product.price)
        }));

        res.json({ products });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default getProducts;
