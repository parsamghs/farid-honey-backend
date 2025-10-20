import dotenv from "dotenv";

dotenv.config();

export const smsConfig = {
  username: process.env.NIKSMS_USERNAME,
  password: process.env.NIKSMS_PASSWORD,
  senderNumber: process.env.NIKSMS_SENDER_NUMBER,
  wsdlUrl: process.env.NIKSMS_WSDL_URL,
};
