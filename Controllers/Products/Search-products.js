import pool from '../../Config/db.js';
import { formatNumber, formatNumbersintext } from '../../Helpers/Number-formatter.js';

async function searchProducts(req, res) {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: 'عبارت جستجو الزامی است.' });
        }

        const result = await pool.query(
            `SELECT id, name, price, number_of_inventory, image_url, category
                FROM products
                WHERE name ILIKE $1 
                OR category ILIKE $1
                OR price::TEXT ILIKE $1
                OR number_of_inventory::TEXT ILIKE $1
                ORDER BY id ASC`,
                [`%${q}%`]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'محصولی یافت نشد.' });
        }

        const products = result.rows.map(product => ({
            ...product,
            name: formatNumbersintext(product.name),                 // اعداد داخل نام فارسی
            price: formatNumber(product.price, true),
            number_of_inventory: formatNumber(product.number_of_inventory, false)
        }));

        res.json({ products });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default searchProducts;
