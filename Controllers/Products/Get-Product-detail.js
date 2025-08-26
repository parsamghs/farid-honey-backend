import pool from '../../Config/db.js';
import { formatNumber } from '../../Helpers/Number-formatter.js';

async function getProductDetails(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'شناسه محصول الزامی است.' });
        }

        const result = await pool.query(
            `SELECT id, name, description, category
             FROM products 
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'محصولی با این شناسه یافت نشد.' });
        }

        const product = result.rows[0];

        const imagesResult = await pool.query(
            `SELECT id, image_url, size, price
             FROM products_images
             WHERE product_id = $1
             ORDER BY 
                CASE 
                    WHEN size = 'یک کیلو' THEN 1
                    WHEN size = 'نیم کیلو' THEN 2
                    ELSE 3
                END ASC`,
            [id]
        );

        const formattedProduct = {
            ...product,
            images: imagesResult.rows.map(img => ({
                ...img,
                price: img.price ? formatNumber(img.price, true) : null
            }))
        };

        res.json({ product: formattedProduct });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default getProductDetails;
