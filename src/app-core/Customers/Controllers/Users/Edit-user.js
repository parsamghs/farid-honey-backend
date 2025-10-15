import UserService from "../../Services/Users/Edit-user.js";

async function updateUser(req, res) {
  const { id } = req.user;
  const { name, phone_number, password, gmail, born_date } = req.body;

  try {
    await UserService.updateUser(id, { name, phone_number, password, gmail, born_date });

    return res.json({
      message: "اطلاعات کاربر با موفقیت ویرایش شد."
    });
  } catch (err) {
    console.error("خطا در ویرایش کاربر:", err);
    return res
      .status(err.status || 500)
      .json({ error: err.message || "خطای داخلی سرور." });
  }
}

export default updateUser;
