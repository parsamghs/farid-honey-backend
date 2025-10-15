import AuthService from "../../Services/Users/Register-user.js";

async function registerUser(req, res) {
  try {
    const { name, phone_number, password, gmail, born_date  } = req.body;
    const result = await AuthService.register({ name, phone_number, password, gmail, born_date  });
    res.status(201).json(result);
  } catch (err) {
    console.error("خطا در ثبت نام:", err);
    res.status(err.status || 500).json({ message: err.message || "خطای سرور" });
  }
}

export default registerUser;
