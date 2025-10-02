import AuthService from "../Services/Logout-User";

async function logoutUser(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({ message: "رفرش توکن وجود ندارد." });
    }

    await AuthService.logout(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.json({ message: "با موفقیت خارج شدید." });
  } catch (err) {
    console.error("❌ خطا در لاگ اوت:", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "خطای سرور" });
  }
}

export default logoutUser;
