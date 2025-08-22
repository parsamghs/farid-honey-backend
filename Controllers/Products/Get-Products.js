import pool from '../../Config/db.js';
import formatNumber from '../../Helpers/Number-formatter.js';

async function getProducts(req, res) {
    try {
        const result = await pool.query(
            'SELECT id, name, price, "Number of inventory", image_url, category FROM products ORDER BY id ASC'
        );

        const products = result.rows.map(product => ({
            ...product,
            price: formatNumber(product.price, true),
            "Number of inventory": formatNumber(product["Number of inventory"], false)
        }));

        res.json({ products });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default getProducts;
