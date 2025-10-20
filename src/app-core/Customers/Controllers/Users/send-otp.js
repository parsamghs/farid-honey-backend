import { sendOtpToPhone } from "../../Services/Users/Send-otp.js";

export async function sendOtp(req, res) {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "شماره تلفن الزامی است." });
    }

    const result = await sendOtpToPhone(phoneNumber);

    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
  } catch (err) {
    console.log("خطا در authController:", err);
    return res.status(500).json({ message: "خطا در ارسال OTP." });
  }
}
