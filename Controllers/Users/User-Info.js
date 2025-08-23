import pool from '../../Config/db.js';
import { formatNumbersintext } from '../../Helpers/Number-formatter.js';

async function getUserProfile(req, res) {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            'SELECT id, name, phone_number, role FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'کاربر یافت نشد.' });
        }

        const user = result.rows[0];

        res.json({
            user: {
                ...user,
                phone_number: formatNumbersintext(user.phone_number) // فارسی کردن شماره تلفن
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default getUserProfile;
