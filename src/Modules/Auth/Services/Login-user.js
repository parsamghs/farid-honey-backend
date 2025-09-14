import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../Models/Login-user.js";
import regex from "../../../Utils/Validator.js";

const AuthService = {
  login: async ({ phone_number, password }) => {
    if (!phone_number || !password) {
      throw { status: 400, message: "شماره تماس و رمز عبور الزامی هستند." };
    }

    if (!regex.phone_number.test(phone_number)) {
      throw { status: 400, message: "شماره تماس معتبر نیست." };
    }

    const user = await UserRepository.findByPhone(phone_number);
    if (!user) {
      throw { status: 400, message: "کاربری با این شماره تماس یافت نشد." };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 400, message: "رمز عبور نادرست است." };
    }

    const token = jwt.sign(
      {
        id: user.id.toString(),
        role: user.role,
        phone_number: user.phone_number
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
      token,
      name: user.name,
      phone_number: user.phone_number,
      role: user.role
    };
  }
};

export default AuthService;
