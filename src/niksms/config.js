import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env.development"),
});

export const smsConfig = {
  username: process.env.NIKSMS_USERNAME,
  password: process.env.NIKSMS_PASSWORD,
  senderNumber: process.env.NIKSMS_SENDER_NUMBER,
  wsdlUrl: process.env.NIKSMS_WSDL_URL,
};

console.log("📦 smsConfig:", smsConfig);
