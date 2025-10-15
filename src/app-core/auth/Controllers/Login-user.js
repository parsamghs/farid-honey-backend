import AuthService from "../Services/Login-user.js";
import ms from "ms";

async function loginUser(req, res) {
  try {
    const { phone_number, password } = req.body;
    const { accessToken, refreshToken, name, role } = await AuthService.login({ phone_number, password });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: ms(process.env.JWT_REFRESH_EXPIRES_IN),
    });

    res.json({ accessToken, name, phone_number, role });
  } catch (err) {
    console.error("خطا در لاگین:", err);
    return res.status(err.status || 500).json({ message: err.message || "خطای سرور" });
  }
}

export default loginUser;
