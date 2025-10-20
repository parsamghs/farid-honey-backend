import { generateAndSendOtp } from "../../../../niksms/smsservice.js";
import { createPhoneVerification } from "../../Models/Users/send-otp.js";

export const sendOtpToPhone = async (phoneNumber) => {
  try {
    const { otp, otpHash, sent, expiresAt } = await generateAndSendOtp(phoneNumber);

    if (!sent) {
      return { success: false, message: "ارسال پیامک موفقیت‌آمیز نبود." };
    }

    await createPhoneVerification({ phoneNumber, otpHash, expiresAt });

    return { success: true, message: "پیامک ارسال شد.", otp };
  } catch (err) {
    console.log("خطا در otpService:", err);
    return { success: false, message: "خطا در ارسال OTP." };
  }
};
