import pool from '../../Config/db.js';

async function deleteAddress(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  const addressId = req.params.id;
  if (!addressId) return res.status(400).json({ message: 'آیدی آدرس الزامی است' });

  try {
    const result = await pool.query(
      'DELETE FROM address WHERE id = $1 AND user_id = $2 RETURNING *',
      [addressId, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'آدرس یافت نشد یا اجازه حذف ندارید' });
    }

    res.status(200).json({ message: 'آدرس با موفقیت حذف شد' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در حذف آدرس' });
  }
}

export default deleteAddress;
