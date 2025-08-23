import pool from '../../Config/db.js';
import {formatNumber} from '../../Helpers/Number-formatter.js';

async function getProductDetails(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'شناسه محصول الزامی است.' });
        }

        const result = await pool.query(
            `SELECT id, name, price, number_of_inventory, description, image_url, category
             FROM products 
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'محصولی با این شناسه یافت نشد.' });
        }

        const product = result.rows[0];

        const formattedProduct = {
            ...product,
            price: formatNumber(product.price, true),
            number_of_inventory: formatNumber(product.number_of_inventory, false)
        };

        res.json({ product: formattedProduct });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default getProductDetails;