import pool from '../../Config/db.js';
import bcryptjs from "bcryptjs";

async function updateUser(req, res) {
  const { id } = req.user;  
  let { name, phone_number, password } = req.body;

  try {
    if (!name && !phone_number && !password) {
      return res.status(400).json({ error: "هیچ فیلدی برای ویرایش ارسال نشده است." });
    }

    const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: "کاربر یافت نشد." });
    }

    let updateFields = [];
    let updateValues = [];
    let counter = 1;

    if (name) {
      name = name.trim();
      updateFields.push(`name = $${counter}`);
      updateValues.push(name);
      counter++;
    }

    if (phone_number) {
      phone_number = phone_number.trim();
      const phoneCheck = await pool.query(
        "SELECT id FROM users WHERE phone_number = $1 AND id != $2",
        [phone_number, id]
      );
      if (phoneCheck.rows.length > 0) {
        return res.status(400).json({ error: "این شماره تلفن قبلاً ثبت شده است." });
      }

      updateFields.push(`phone_number = $${counter}`);
      updateValues.push(phone_number);
      counter++;
    }

    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updateFields.push(`password = $${counter}`);
      updateValues.push(hashedPassword);
      counter++;
    }

    const query = `
      UPDATE users
      SET ${updateFields.join(", ")}
      WHERE id = $${counter}
      RETURNING id, name, phone_number, role
    `;
    updateValues.push(id);

    const result = await pool.query(query, updateValues);

    return res.json({
      message: "اطلاعات کاربر با موفقیت ویرایش شد."
    });
  } catch (err) {
    console.error("خطا در ویرایش کاربر:", err);
    return res.status(500).json({ error: "خطای داخلی سرور." });
  }
}

export default updateUser;
