import { verifyOtp } from "../../Services/Users/verify-otp.js";

export async function verifyOtpController(req, res) {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: "شماره تلفن و OTP الزامی است." });
    }

    const result = await verifyOtp(phoneNumber, otp);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
  } catch (err) {
    console.log("خطا در verifyOtpController:", err);
    return res.status(500).json({ message: "خطا در اعتبارسنجی OTP." });
  }
}
