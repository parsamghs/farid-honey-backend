import pool from '../../Config/db.js';
import regex from '../../Utils/Validator.js';

async function addAddress(req, res) {
  const user_id = req.user?.id;
  const phone_number = req.user?.phone_number;
  if (!user_id || !phone_number) {
    return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });
  }

  const { province, city, address, plate, unit, Postal_code, receiver } = req.body;

  const validations = [
    { field: 'province', value: province, required: true, regex: regex.province, message: 'استان معتبر نیست (فقط فارسی تا 100 کاراکتر)' },
    { field: 'city', value: city, required: true, regex: regex.city, message: 'شهر معتبر نیست (فقط فارسی تا 50 کاراکتر)' },
    { field: 'address', value: address, required: true, regex: regex.address, message: 'آدرس معتبر نیست (حداکثر 250 کاراکتر)' },
    { field: 'plate', value: plate, required: false, regex: regex.plate, message: 'پلاک معتبر نیست (اعداد تا 10 کاراکتر)' },
    { field: 'unit', value: unit, required: false, regex: regex.unit, message: 'واحد معتبر نیست (اعداد تا 5 کاراکتر)' },
    { field: 'Postal_code', value: Postal_code, required: false, regex: regex.postal_code, message: 'کد پستی معتبر نیست (اعداد تا 20 کاراکتر)' },
    { field: 'receiver', value: receiver, required: true, regex: regex.receiver, message: 'دریافت‌کننده معتبر نیست (فارسی/انگلیسی تا 50 کاراکتر)' },
    { field: 'phone_number', value: phone_number, required: true, regex: regex.phone_number, message: 'شماره تلفن معتبر نیست' },
  ];

  const errors = [];
  validations.forEach(rule => {
    if (rule.required && (rule.value === undefined || rule.value === null || rule.value === '')) {
      errors.push(rule.message);
    } else if (rule.regex && rule.value && !rule.regex.test(rule.value)) {
      errors.push(rule.message);
    }
  });

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    await pool.query(
      `INSERT INTO address 
       (user_id, province, city, address, plate, unit, "Postal code", receiver, phone_number)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
       [user_id, province, city, address, plate, unit, Postal_code || null, receiver, phone_number]
    );

    res.status(201).json({ message: 'آدرس با موفقیت ثبت شد' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در ثبت آدرس' });
  }
}

export default addAddress;
