import { getCartService } from '../../Services/Carts/Get-Cart.js';

async function getCart(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  try {
    const cartData = await getCartService(user_id);
    res.status(200).json(cartData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در دریافت سبد خرید' });
  }
}

export default getCart;
