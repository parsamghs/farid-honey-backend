import pool from '../../Config/db.js';
import { formatNumber, formatNumbersintext } from '../../Helpers/Number-formatter.js';


async function getUserAddresses(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  try {
    const result = await pool.query(
      `SELECT id, province, city, address, plate, unit, "Postal code" AS postal_code, receiver, phone_number
       FROM address
       WHERE user_id = $1
       ORDER BY id DESC`,
      [user_id]
    );

    const addresses = result.rows.map(addr => ({
      ...addr,
      plate: formatNumber(addr.plate, false),
      unit: formatNumber(addr.unit, false),
      postal_code: formatNumber(addr.postal_code, false),
      phone_number: formatNumbersintext(addr.phone_number),
      address: formatNumbersintext(addr.address)
    }));

    res.status(200).json({ addresses });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در دریافت آدرس‌ها' });
  }
}

export default getUserAddresses;
