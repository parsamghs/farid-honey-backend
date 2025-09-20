import bcryptjs from "bcryptjs";
import UserRepository from "../../Models/Users/Edit-user.js";

const UserService = {
  updateUser: async (id, { name, phone_number, password }) => {
    if (!name && !phone_number && !password) {
      throw { status: 400, message: "هیچ فیلدی برای ویرایش ارسال نشده است." };
    }

    const user = await UserRepository.findById(id);
    if (!user) {
      throw { status: 404, message: "کاربر یافت نشد." };
    }

    const updateFields = {};

    if (name) updateFields.name = name.trim();

    if (phone_number) {
      const phoneExists = await UserRepository.findByPhoneExcludingUser(phone_number.trim(), id);
      if (phoneExists) {
        throw { status: 400, message: "این شماره تلفن قبلاً ثبت شده است." };
      }
      updateFields.phone_number = phone_number.trim();
    }

    if (password) {
      updateFields.password = await bcryptjs.hash(password, 10);
    }

    const updatedUser = await UserRepository.updateUser(updateFields, id);
    return updatedUser;
  }
};

export default UserService;
