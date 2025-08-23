import pool from '../../Config/db.js';

async function updateCartItemQuantity(req, res) {
    const user_id = req.user?.id;
    if (!user_id) return res.status(401).json({ message: 'کاربر احراز هویت نشده است' });

    const { id } = req.params;
    const { action, quantity } = req.body;

    try {
        const { rows } = await pool.query(
            `SELECT ci.id, ci.product_id, ci.quantity, p.number_of_inventory, p.price
       FROM cart_items ci
       JOIN cart c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE ci.id = $1 AND c.user_id = $2`,
            [id, user_id]
        );

        if (!rows.length) {
            return res.status(404).json({ message: 'محصولی در سبد خرید شما یافت نشد' });
        }

        const item = rows[0];

        const currentQuantity = Number(item.quantity);

        const actionMap = {
            increment: currentQuantity + 1,
            decrement: currentQuantity - 1
        };

        let newQuantity = action ? actionMap[action] : Number(quantity);

        if (newQuantity === undefined) {
            return res.status(400).json({ message: 'باید یا action یا quantity معتبر ارسال شود' });
        }

        if (newQuantity <= 0) {
            await pool.query('DELETE FROM cart_items WHERE id = $1', [id]);
            return res.status(200).json({ message: 'محصول از سبد خرید حذف شد', newQuantity: 0 });
        }

        if (newQuantity > item.number_of_inventory) {
            return res.status(400).json({ message: `تعداد وارد شده بیشتر از موجودی است (${item.number_of_inventory} عدد موجود است)` });
        }

        await pool.query(
            'UPDATE cart_items SET quantity = $1, price = $2 WHERE id = $3',
            [newQuantity, item.price * newQuantity, id]
        );

        res.status(200).json({ message: 'تعداد محصول بروزرسانی شد', newQuantity });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'خطا در بروزرسانی تعداد محصول' });
    }
}

export default updateCartItemQuantity;
