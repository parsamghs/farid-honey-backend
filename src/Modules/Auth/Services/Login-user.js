import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ms from "ms";
import UserRepository from "../Models/Login-user.js";
import prisma from "../../../Config/db.js";
import regex from "../../../Utils/Validator.js";

const AuthService = {
  login: async ({ phone_number, password }) => {
    if (!phone_number || !password) throw { status: 400, message: "شماره تماس و رمز عبور الزامی هستند." };
    if (!regex.phone_number.test(phone_number)) throw { status: 400, message: "شماره تماس معتبر نیست." };

    const user = await UserRepository.findByPhone(phone_number);
    if (!user) throw { status: 400, message: "کاربری با این شماره تماس یافت نشد." };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { status: 400, message: "رمز عبور نادرست است." };

    const accessToken = jwt.sign(
      { id: user.id.toString(), role: user.role, phone_number: user.phone_number },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { id: user.id.toString() },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    await prisma.refresh_token.upsert({
      where: { user_id: user.id },
      update: {
        token: refreshToken,
        created_at: new Date(),
        expires_at: new Date(Date.now() + ms(process.env.JWT_REFRESH_EXPIRES_IN)),
      },
      create: {
        token: refreshToken,
        user_id: user.id,
        created_at: new Date(),
        expires_at: new Date(Date.now() + ms(process.env.JWT_REFRESH_EXPIRES_IN)),
      },
    });

    return {  accessToken, refreshToken, name: user.name, phone_number: user.phone_number, role: user.role  };
  }
};

export default AuthService;


