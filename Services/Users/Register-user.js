import bcrypt from "bcryptjs";
import { regex } from "../../Utils/Validator.js";
import UserRepository from "../../repositories/Users/Register-user.js";

const AuthService = {
  register: async ({ name, phone_number, password }) => {
    if (!name || !phone_number || !password) {
      throw { status: 400, message: "همه فیلدها الزامی هستند." };
    }

    if (!regex.name.test(name)) {
      throw { status: 400, message: "نام وارد شده معتبر نیست. (فقط حروف فارسی و فاصله، ۱ تا ۵۰ کاراکتر)" };
    }

    if (!regex.phone_number.test(phone_number)) {
      throw { status: 400, message: "شماره تماس معتبر نیست." };
    }

    if (!regex.password.test(password)) {
      throw { status: 400, message: "رمز عبور معتبر نیست. (حداقل ۴ کاراکتر، شامل یک حرف بزرگ، یک عدد و یک علامت)" };
    }

    const existingUser = await UserRepository.findByPhone(phone_number);
    if (existingUser) {
      throw { status: 400, message: "این شماره تماس قبلا ثبت شده است." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserRepository.create({
      name,
      phone_number,
      password: hashedPassword,
      role: "مشتری"
    });

    return { message: "ثبت نام با موفقیت انجام شد." };
  }
};

export default AuthService;
