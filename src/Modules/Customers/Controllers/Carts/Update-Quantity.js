import { updateCartItemQuantityService } from '../../Services/Carts/Update-Quantity.js';

async function updateCartItemQuantity(req, res) {
    const user_id = req.user?.id;
    if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

    const { id } = req.params;
    const { action, quantity } = req.body;

    try {
        const result = await updateCartItemQuantityService(id, user_id, action, quantity);

        if (result.deleted) {
            return res.status(200).json({ message: 'محصول از سبد خرید حذف شد', newQuantity: 0 });
        }

        res.status(200).json({ message: 'تعداد محصول بروزرسانی شد', newQuantity: result.newQuantity });
    } catch (err) {
        if (err.message.includes('یافت نشد')) {
            return res.status(404).json({ message: err.message });
        }
        console.error(err);
        res.status(500).json({ message: 'خطا در بروزرسانی تعداد محصول' });
    }
}

export default updateCartItemQuantity;
