import soap from "soap";
import bcryptjs from "bcryptjs";
import { smsConfig } from "./config.js";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function hashOtp(otp) {
  const saltRounds = 10;
  const hash = await bcryptjs.hash(otp, saltRounds);
  return hash;
}

export async function sendPtpSms(number, message) {
  const authenticate = {
    security: {
      Username: smsConfig.username,
      Password: smsConfig.password,
    },
  };

  const ptpModel = {
    security: {
      Username: smsConfig.username,
      Password: smsConfig.password,
    },
    model: {
      Message: [{ string: message }],
      SenderNumber: smsConfig.senderNumber,
      Numbers: [{ string: number }],
      SendType: "Normal",
      YourMessageId: [{ long: "1" }],
    },
  };

  try {
    const client = await soap.createClientAsync(smsConfig.wsdlUrl);
    const [result] = await client.PtpSmsAsync(ptpModel);

    console.log("📨 نتیجه کامل ارسال:", JSON.stringify(result, null, 2));

    if (result.PtpSmsResult?.Status === "Success") {
      console.log(`پیامک با موفقیت به ${number} ارسال شد.`);
      return true;
    } else {
      console.log(`خطا در ارسال پیامک به ${number}:`, result.PtpSmsResult?.Status);
      return false;
    }
  } catch (err) {
    console.log(`خطا در ارسال پیامک به ${number}:`, err);
    return false;
  }
}

export async function generateAndSendOtp(phoneNumber) {
  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const message = `کد تایید شما: ${otp}`;

  const sent = await sendPtpSms(phoneNumber, message);

  return {
    otp,
    otpHash,
    sent,
    expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
  };
}
