import { getUserAddressesService } from '../../Services/Addresses/Get-addresses.js';

async function getUserAddresses(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  try {
    const addresses = await getUserAddressesService(user_id);
    res.status(200).json({ addresses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در دریافت آدرس‌ها' });
  }
}

export default getUserAddresses;
