import pool from '../../Config/db.js';
import bcrypt from 'bcryptjs';
import { regex } from '../../Utils/Validator.js';

async function registerUser(req, res) {
    try {
        const { name, phone_number, password } = req.body;

        if (!name || !phone_number || !password) {
            return res.status(400).json({ message: 'همه فیلدها الزامی هستند.' });
        }

        if (!regex.name.test(name)) {
            return res.status(400).json({ message: 'نام وارد شده معتبر نیست. (فقط حروف فارسی و فاصله، ۱ تا ۵۰ کاراکتر)' });
        }

        if (!regex.phone_number.test(phone_number)) {
            return res.status(400).json({ message: 'شماره تماس معتبر نیست.' });
        }

        if (!regex.password.test(password)) {
            return res.status(400).json({ message: 'رمز عبور معتبر نیست. (حداقل ۴ کاراکتر، شامل یک حرف بزرگ، یک عدد و یک علامت)' });
        }

        const existingUser = await pool.query(
            'SELECT * FROM users WHERE phone_number = $1',
            [phone_number]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'این شماره تماس قبلا ثبت شده است.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (name, phone_number, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, phone_number, role',
            [name, phone_number, hashedPassword, 'مشتری']
        );

        res.status(201).json({
            message: 'ثبت نام با موفقیت انجام شد.'
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'خطای سرور' });
    }
}

export default registerUser;
