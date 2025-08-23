import pool from '../../Config/db.js';
import regex from '../../Utils/Validator.js';

async function updateAddress(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  const addressId = req.params.id;
  if (!addressId) return res.status(400).json({ message: 'آیدی آدرس الزامی است' });

  const { province, city, address, plate, unit, Postal_code, receiver } = req.body;

  try {
    const existing = await pool.query(
      'SELECT * FROM address WHERE id = $1 AND user_id = $2',
      [addressId, user_id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ message: 'آدرس یافت نشد یا اجازه ویرایش ندارید' });
    }

    const current = existing.rows[0];

    const updatedValues = {
      province: province ?? current.province,
      city: city ?? current.city,
      address: address ?? current.address,
      plate: plate ?? current.plate,
      unit: unit ?? current.unit,
      Postal_code: Postal_code ?? current['Postal code'],
      receiver: receiver ?? current.receiver
    };

    const validations = [
      { field: 'province', value: updatedValues.province, required: true, regex: regex.province, message: 'استان معتبر نیست' },
      { field: 'city', value: updatedValues.city, required: true, regex: regex.city, message: 'شهر معتبر نیست' },
      { field: 'address', value: updatedValues.address, required: true, regex: regex.address, message: 'آدرس معتبر نیست' },
      { field: 'plate', value: updatedValues.plate, required: true, regex: regex.plate, message: 'پلاک معتبر نیست' },
      { field: 'unit', value: updatedValues.unit, required: true, regex: regex.unit, message: 'واحد معتبر نیست' },
      { field: 'Postal_code', value: updatedValues.Postal_code, required: false, regex: regex.postal_code, message: 'کد پستی معتبر نیست' },
      { field: 'receiver', value: updatedValues.receiver, required: true, regex: regex.receiver, message: 'دریافت‌کننده معتبر نیست' },
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

    await pool.query(
      `UPDATE address SET province=$1, city=$2, address=$3, plate=$4, unit=$5, "Postal code"=$6, receiver=$7
       WHERE id=$8 AND user_id=$9`,
      [
        updatedValues.province,
        updatedValues.city,
        updatedValues.address,
        updatedValues.plate,
        updatedValues.unit,
        updatedValues.Postal_code || null,
        updatedValues.receiver,
        addressId,
        user_id
      ]
    );

    res.status(200).json({ message: 'آدرس با موفقیت ویرایش شد' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطا در ویرایش آدرس' });
  }
}

export default updateAddress;
