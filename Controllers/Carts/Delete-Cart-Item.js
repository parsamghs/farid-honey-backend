import { removeFromCartService } from '../../Services/Carts/Delete-Cart-Item.js';

async function removeFromCart(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'شناسه cart_item الزامی است' });

  try {
    await removeFromCartService(id, user_id);
    res.status(200).json({ message: 'محصول با موفقیت از سبد حذف شد' });
  } catch (err) {
    if (err.message.includes('یافت نشد')) {
      return res.status(404).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'خطا در حذف محصول از سبد' });
  }
}

export default removeFromCart;
