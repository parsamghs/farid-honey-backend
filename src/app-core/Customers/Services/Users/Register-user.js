import bcrypt from "bcryptjs";
import moment from "moment-jalaali";
import UserRepository from "../../Models/Users/Register-user.js";
import { regex } from "../../../../Utils/Validator.js";

const AuthService = {
  register: async ({ name, phone_number, password, gmail, born_date }) => {
    if (!name || !phone_number || !password) {
      throw { status: 400, message: "همه فیلدها الزامی هستند." };
    }

    if (!regex.name.test(name)) {
      throw { status: 400, message: "نام وارد شده معتبر نیست. (فقط حروف فارسی و فاصله، ۱ تا ۵۰ کاراکتر)" };
    }

    if (!regex.phone_number.test(phone_number)) {
      throw { status: 400, message: "شماره تماس معتبر نیست." };
    }

    if (gmail && !regex.email.test(gmail)) {
      throw { status: 400, message: "آدرس ایمیل معتبر نیست." };
    }

    if (born_date && !regex.birth_date.test(born_date)) {
      throw { status: 400, message: "تاریخ تولد معتبر نیست. فرمت باید YYYY-MM-DD باشد." };
    }

    if (!regex.password.test(password)) {
      throw { status: 400, message: "رمز عبور معتبر نیست. (حداقل ۴ کاراکتر، شامل یک حرف بزرگ، یک عدد و یک علامت)" };
    }

    const existingUser = await UserRepository.findByPhone(phone_number);
    if (existingUser) {
      throw { status: 400, message: "این شماره تماس قبلا ثبت شده است." };
    }

    const convertedDate = born_date
      ? moment(born_date, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
      : null;

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserRepository.create({
      name,
      phone_number,
      password: hashedPassword,
      role: "CUSTOMER",
      gmail,
      born_date: convertedDate ? new Date(convertedDate) : null
    });

    return { message: "ثبت نام با موفقیت انجام شد." };
  }
};

export default AuthService;
