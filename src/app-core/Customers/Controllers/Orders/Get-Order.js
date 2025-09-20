import { getUserOrdersService } from '../../Services/Orders/Get-Order.js';

async function getUserOrders(req, res) {
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });
  }

  try {
    const orders = await getUserOrdersService(user_id);

    if (!orders.length) {
      return res.status(200).json({ message: 'سفارشی یافت نشد', orders: [] });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در دریافت سفارش‌ها' });
  }
}

export default getUserOrders;
