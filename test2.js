import soap from "soap";
import { smsConfig } from "./src/niksms/config.js";

export async function nikDiagnostics() {
  try {

    const client = await soap.createClientAsync(smsConfig.wsdlUrl);

    const [credit] = await client.GetCreditAsync({
      security: { Username: smsConfig.username, Password: smsConfig.password },
    });
    console.log("💰 Credit:", credit?.GetCreditResult);

    const [expire] = await client.GetPanelExpireDateAsync({
      security: { Username: smsConfig.username, Password: smsConfig.password },
    });
    console.log("🗓 Expire Date:", expire?.GetPanelExpireDateResult);

    const [senders] = await client.GetSenderNumbersAsync({
      security: { Username: smsConfig.username, Password: smsConfig.password },
    });
    console.log("📤 SenderNumbers:", senders?.GetSenderNumbersResult?.string);

    const [srvtime] = await client.GetServertimeAsync({
      security: { Username: smsConfig.username, Password: smsConfig.password },
    });
    console.log("🕒 ServerTime:", srvtime?.GetServertimeResult);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

nikDiagnostics();
