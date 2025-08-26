import pool from '../../Config/db.js';

async function addToCart(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  const { product_id, size } = req.body;
  if (!product_id || !size) {
    return res.status(400).json({ message: 'product_id و size الزامی هستند' });
  }

  try {
    const productResult = await pool.query(
      `SELECT price
       FROM products_images
       WHERE product_id = $1 AND size = $2
       LIMIT 1`,
      [product_id, size]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: 'محصول با سایز انتخاب شده یافت نشد' });
    }

    const productPrice = parseInt(productResult.rows[0].price);

    let cartResult = await pool.query('SELECT * FROM cart WHERE user_id = $1', [user_id]);
    let cart_id;
    if (cartResult.rows.length === 0) {
      const newCart = await pool.query(
        'INSERT INTO cart (user_id, created_at) VALUES ($1, NOW()) RETURNING id',
        [user_id]
      );
      cart_id = newCart.rows[0].id;
    } else {
      cart_id = cartResult.rows[0].id;
    }

    const productInCart = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2 AND size = $3',
      [cart_id, product_id, size]
    );

    if (productInCart.rows.length === 0) {
      await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, size, quantity, price, unit_price) VALUES ($1, $2, $3, $4, $5, $6)',
        [cart_id, product_id, size, 1, productPrice, productPrice]
      );
    } else {
      const item = productInCart.rows[0];
      const newQuantity = parseInt(item.quantity) + 1;
      const unitPrice = parseInt(item.unit_price);

      await pool.query(
        'UPDATE cart_items SET quantity = $1, price = $2 WHERE id = $3',
        [newQuantity, unitPrice * newQuantity, item.id]
      );
    }

    res.status(200).json({ message: 'محصول با موفقیت به سبد اضافه شد' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در افزودن محصول به سبد' });
  }
}

export default addToCart;
