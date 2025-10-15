import bcryptjs from "bcryptjs";
import moment from "moment-jalaali";
import UserRepository from "../../Models/Users/Edit-user.js";
import { regex } from "../../../../Utils/Validator.js";

const UserService = {
  updateUser: async (id, { name, phone_number, password, gmail, born_date }) => {
    if (!name && !phone_number && !password && !gmail && !born_date) {
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

    if (gmail) {
      if (!regex.email.test(gmail)) {
        throw { status: 400, message: "ایمیل معتبر نیست." };
      }
      updateFields.gmail = gmail.trim();
    }

    if (born_date) {
      if (!regex.birth_date.test(born_date)) {
        throw { status: 400, message: "تاریخ تولد معتبر نیست. فرمت باید YYYY-MM-DD شمسی باشد." };
      }
      const miladiDate = moment(born_date, "jYYYY-jMM-jDD").format("YYYY-MM-DD");
      updateFields.born_date = new Date(miladiDate);
    }

    if (password) {
      updateFields.password = await bcryptjs.hash(password, 10);
    }

    const updatedUser = await UserRepository.updateUser(updateFields, id);
    return updatedUser;
  }
};

export default UserService;
