import UserService from "../../Services/Users/User-Info.js";

async function getUserProfile(req, res) {
  try {
    const userId = req.user.id;
    const user = await UserService.getProfile(userId);
    res.json({ user });
  } catch (err) {
    console.error("خطا در دریافت پروفایل:", err);
    res.status(err.status || 500).json({ message: err.message || "خطای سرور" });
  }
}

export default getUserProfile;
