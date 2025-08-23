import pool from '../../Config/db.js';

async function removeFromCart(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'شناسه cart_item الزامی است' });

  try {
    const { rows } = await pool.query(
      `SELECT ci.id 
       FROM cart_items ci
       JOIN cart c ON ci.cart_id = c.id
       WHERE ci.id = $1 AND c.user_id = $2`,
      [id, user_id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'محصولی در سبد خرید شما یافت نشد' });
    }

    await pool.query('DELETE FROM cart_items WHERE id = $1', [id]);

    res.status(200).json({ message: 'محصول با موفقیت از سبد حذف شد' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در حذف محصول از سبد' });
  }
}

export default removeFromCart;
