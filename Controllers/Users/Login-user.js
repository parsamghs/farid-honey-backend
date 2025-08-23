import pool from '../../Config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import regex from '../../Utils/Validator.js'; 

async function loginUser(req, res) {
    try {
        const { phone_number, password } = req.body;

        if (!phone_number || !password) {
            return res.status(400).json({ message: 'شماره تماس و رمز عبور الزامی هستند.' });
        }

        if (!regex.phone_number.test(phone_number)) {
            return res.status(400).json({ message: 'شماره تماس معتبر نیست.' });
        }

        const userResult = await pool.query(
            'SELECT * FROM users WHERE phone_number = $1',
            [phone_number]
        );

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'کاربری با این شماره تماس یافت نشد.' });
        }

        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'رمز عبور نادرست است.' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role,
              phone_number: user.phone_number
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            token,
            name: user.name,
            phone_number: user.phone_number,
            role: user.role
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default loginUser;
