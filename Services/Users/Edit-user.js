import bcryptjs from "bcryptjs";
import UserRepository from "../../repositories/Users/Edit-user.js";

const UserService = {
  updateUser: async (id, { name, phone_number, password }) => {
    if (!name && !phone_number && !password) {
      throw { status: 400, message: "هیچ فیلدی برای ویرایش ارسال نشده است." };
    }

    const user = await UserRepository.findById(id);
    if (!user) {
      throw { status: 404, message: "کاربر یافت نشد." };
    }

    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push(`name = $${updateValues.length + 1}`);
      updateValues.push(name.trim());
    }

    if (phone_number) {
      const phoneExists = await UserRepository.findByPhoneExcludingUser(phone_number.trim(), id);
      if (phoneExists) {
        throw { status: 400, message: "این شماره تلفن قبلاً ثبت شده است." };
      }
      updateFields.push(`phone_number = $${updateValues.length + 1}`);
      updateValues.push(phone_number.trim());
    }

    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updateFields.push(`password = $${updateValues.length + 1}`);
      updateValues.push(hashedPassword);
    }

    const updatedUser = await UserRepository.updateUser(updateFields, updateValues, id);
    return updatedUser;
  }
};

export default UserService;
