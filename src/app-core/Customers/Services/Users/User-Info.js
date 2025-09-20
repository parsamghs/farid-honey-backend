import UserRepository from "../../Models/Users/User-Info.js";
import { formatNumbersintext } from "../../../../Helpers/Number-formatter.js";

const UserService = {
  getProfile: async (userId) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw { status: 404, message: "کاربر یافت نشد." };
    }

    return {
      ...user,
      id: user.id.toString(),
      phone_number: formatNumbersintext(user.phone_number)
    };
  }
};

export default UserService;
