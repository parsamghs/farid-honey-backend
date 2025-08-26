import pool from '../../Config/db.js';
import { formatNumber, formatNumbersintext } from '../../Helpers/Number-formatter.js';

async function getCart(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  try {
    const cartResult = await pool.query(
      'SELECT id FROM cart WHERE user_id = $1',
      [user_id]
    );

    if (cartResult.rows.length === 0) {
      return res.status(200).json({ cart_id: null, products: [], total_price: "۰" });
    }

    const cart_id = cartResult.rows[0].id;

    const productsResult = await pool.query(
      `SELECT 
          ci.id AS cart_item_id, 
          p.name, 
          ci.quantity, 
          ci.price, 
          ci.size,
          pi.image_url
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       LEFT JOIN products_images pi 
         ON pi.product_id = ci.product_id AND pi.size = ci.size
       WHERE ci.cart_id = $1`,
      [cart_id]
    );

    const products = productsResult.rows.map(item => ({
      ...item,
      name: formatNumbersintext(item.name),
      price: formatNumber(item.price, true), 
      quantity: formatNumber(item.quantity, false),
      size: item.size || null,
      image_url: item.image_url || null
    }));

    const total_price_number = productsResult.rows.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const total_price = formatNumber(total_price_number, true);

    res.status(200).json({
      cart_id,
      products,
      total_price
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در دریافت سبد خرید' });
  }
}

export default getCart;
