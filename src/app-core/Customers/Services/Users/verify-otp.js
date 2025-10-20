import bcryptjs from "bcryptjs";
import { getLatestPhoneVerification, deletePhoneVerification } from "../../Models/Users/verify-otp.js";

export const verifyOtp = async (phoneNumber, otp) => {
  try {
    const record = await getLatestPhoneVerification(phoneNumber);

    if (!record) {
      return { success: false, message: "کد تایید یافت نشد." };
    }

    if (new Date() > record.expires_at) {
      return { success: false, message: "کد تایید منقضی شده است." };
    }

    const match = await bcryptjs.compare(otp, record.otp_hash);
    if (!match) {
      return { success: false, message: "کد تایید اشتباه است." };
    }

    await deletePhoneVerification(record.id);

    return { success: true, message: "تایید شماره موفق بود." };
  } catch (err) {
    console.log("خطا در verifyOtp:", err);
    return { success: false, message: "خطا در اعتبارسنجی OTP." };
  }
};
