import { deleteAddressByUser } from '../../Services/Addresses/Delete-Addresses.js';

async function deleteAddress(req, res) {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

  const addressId = req.params.id;
  if (!addressId) return res.status(400).json({ message: 'آیدی آدرس الزامی است' });

  try {
    await deleteAddressByUser(addressId, user_id);
    res.status(200).json({ message: 'آدرس با موفقیت حذف شد' });
  } catch (err) {
    if (err.message.includes('یافت نشد')) {
      return res.status(404).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'خطا در حذف آدرس' });
  }
}

export default deleteAddress;
