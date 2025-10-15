import { submitOrderService } from '../../Services/Orders/Submit-Order.js';

async function submitOrder(req, res) {
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });
  }

  const cart_id = req.params.cart_id;
  const { address_id } = req.body;

  if (!cart_id || !address_id) {
    return res.status(400).json({ message: 'cart_id در URL و address_id در بادی الزامی هستند' });
  }

  try {
    const result = await submitOrderService(user_id, cart_id, address_id);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در ثبت سفارش' });
  }
}

export default submitOrder;
