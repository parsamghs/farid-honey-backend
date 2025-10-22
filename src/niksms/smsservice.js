import soap from "soap";
import bcryptjs from "bcryptjs";
import { smsConfig } from "./config.js";
import { toNikMsisdn } from "./phone-formater.js";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;

export function generateOtp() {
  return Math.floor(10**(OTP_LENGTH-1) + Math.random() * 9 * 10**(OTP_LENGTH-1)).toString();
}

export async function hashOtp(otp) {
  return bcryptjs.hash(otp, 10);
}

export async function sendPtpSms(number, message) {
  const msisdn = toNikMsisdn(number);
  const sender  = smsConfig.senderNumber;
  const ptpModel = {
    security: { Username: smsConfig.username, Password: smsConfig.password },
    model: {
      Message: [{ string: message }],
      SenderNumber: sender,
      Numbers: [{ string: msisdn }],
      SendType: "Normal",
      YourMessageId: [{ long: String(Date.now()) }],
    },
  };

  try {
    const client = await soap.createClientAsync(smsConfig.wsdlUrl);
    const [result] = await client.PtpSmsAsync(ptpModel);
    const status = result?.PtpSmsResult?.Status;
    console.log("PtpSms status:", status);

    return status === "Success";
  } catch (err) {
    console.error("Soap error:", err);
    return false;
  }
}

export async function generateAndSendOtp(phoneNumber) {
  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const sent = await sendPtpSms(phoneNumber, `کد تایید شما: ${otp}`);
  return { otp, otpHash, sent, expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000) };
}
