import { refreshCookieOptions } from "../../../Utils/cookies.js";
import AuthService from "../Services/Login-user.js";


async function loginUser(req, res) {
  try {
    const { phone_number, password } = req.body;
    const { accessToken, refreshToken, name, role } = await AuthService.login({ phone_number, password });

    res.cookie("refreshToken", refreshToken, refreshCookieOptions());

    res.json({ accessToken, name, phone_number, role });
  } catch (err) {
    console.error("خطا در لاگین:", err);
    return res.status(err.status || 500).json({ message: err.message || "خطای سرور" });
  }
}

export default loginUser;
