import moment from "moment-jalaali";
import UserRepository from "../../Models/Users/User-Info.js";
import { formatNumbersintext } from "../../../../Helpers/Number-formatter.js";

const UserService = {
  getProfile: async (userId) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw { status: 404, message: "کاربر یافت نشد." };
    }

    const bornjalali = moment(user.born_date).format("jYYYY/jMM/jDD");
    
    return {
      ...user,
      id: user.id.toString(),
      phone_number: formatNumbersintext(user.phone_number),
      born_date:formatNumbersintext(bornjalali)
    };
  }
};

export default UserService;
