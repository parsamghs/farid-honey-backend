import { formatNumbersintext } from "../../Helpers/Number-formatter.js";
import UserRepository from "../../repositories/Users/User-Info.js";

const UserService = {
  getProfile: async (userId) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw { status: 404, message: "کاربر یافت نشد." };
    }

    return {
      ...user,
      phone_number: formatNumbersintext(user.phone_number)
    };
  }
};

export default UserService;
