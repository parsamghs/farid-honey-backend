import { addToCartService } from '../../Services/Carts/Add-Cart.js';

async function addToCart(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  const { product_id, size } = req.body;
  if (!product_id || !size) {
    return res.status(400).json({ message: 'product_id و size الزامی هستند' });
  }

  try {
    await addToCartService(user_id, product_id, size);
    res.status(200).json({ message: 'محصول با موفقیت به سبد اضافه شد' });
  } catch (err) {
    if (err.message.includes('یافت نشد')) {
      return res.status(404).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'خطا در افزودن محصول به سبد' });
  }
}

export default addToCart;
