import soap from "soap";
import { smsConfig } from "./src/niksms/config.js";

async function testNikSmsConnection() {
  try {
    const client = await soap.createClientAsync(smsConfig.wsdlUrl);

    const [result] = await client.GetCreditAsync({
      security: {
        Username: smsConfig.username,
        Password: smsConfig.password,
      },
    });

    console.log("💰 نتیجه تست GetCredit:", result.GetCreditResult);
  } catch (err) {
    console.error("❌ خطا در تست ارتباط:", err);
  }
}

testNikSmsConnection();
