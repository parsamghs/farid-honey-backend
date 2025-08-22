import pool from '../../Config/db.js';

async function getUserProfile(req, res) {
    try {
        const userId = req.user.id; // از توکن JWT گرفته میشه (authMiddleware پرش می‌کنه)

        const result = await pool.query(
            'SELECT id, name, phone_number, role FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'کاربر یافت نشد.' });
        }

        res.json({
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default getUserProfile;
