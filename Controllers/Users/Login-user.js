import AuthService from "../../Services/Users/Login-user.js";

async function loginUser(req, res) {
  try {
    const { phone_number, password } = req.body;
    const result = await AuthService.login({ phone_number, password });
    res.json(result);
  } catch (err) {
    console.error("خطا در لاگین:", err);
    return res
      .status(err.status || 500)
      .json({ message: err.message || "خطای سرور" });
  }
}

export default loginUser;
