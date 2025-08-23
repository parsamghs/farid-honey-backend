import pool from '../../Config/db.js';

async function addToCart(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  const { product_id } = req.body;
  if (!product_id) {
    return res.status(400).json({ message: 'product_id الزامی است' });
  }

  try {
    const productResult = await pool.query(
      'SELECT number_of_inventory, price FROM products WHERE id = $1',
      [product_id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: 'محصول یافت نشد' });
    }

    const inventory = parseInt(productResult.rows[0].number_of_inventory);
    const productPrice = parseFloat(productResult.rows[0].price);

    let cartResult = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [user_id]
    );

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
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cart_id, product_id]
    );

    if (productInCart.rows.length === 0) {
      await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [cart_id, product_id, 1, productPrice]
      );
    } else {
      const newQuantity = parseInt(productInCart.rows[0].quantity) + 1;
      if (newQuantity > inventory) {
        return res.status(400).json({ message: `جمع تعداد محصول در سبد بیشتر از موجودی است (${inventory} عدد موجود است)` });
      }

      await pool.query(
        'UPDATE cart_items SET quantity = $1, price = $2 WHERE id = $3',
        [newQuantity, productPrice * newQuantity, productInCart.rows[0].id]
      );
    }

    res.status(200).json({ message: 'محصول با موفقیت به سبد اضافه شد' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در افزودن محصول به سبد' });
  }
}

export default addToCart;
