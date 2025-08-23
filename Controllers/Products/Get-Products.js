import pool from '../../Config/db.js';
import { formatNumbersintext } from '../../Helpers/Number-formatter.js';

async function getProducts(req, res) {
    try {
        const result = await pool.query(
            'SELECT id, name, image_url FROM products ORDER BY id ASC'
        );

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
