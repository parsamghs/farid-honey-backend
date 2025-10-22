import soap from "soap";
import { smsConfig } from "./src/niksms/config.js";
import { toNikMsisdn } from "./src/niksms/phone-formater.js";

(async () => {
  const client = await soap.createClientAsync(smsConfig.wsdlUrl);
  const model = {
    security: { Username: smsConfig.username, Password: smsConfig.password },
    model: {
      Message: "تست گروهی",
      SenderNumber: smsConfig.senderNumber,  
      Numbers: [{ string: toNikMsisdn("09024445509") }],
      SendType: "Normal",
      YourMessageId: [{ long: String(Date.now()) }],
    },
  };
  const [res] = await client.GroupSmsAsync(model);
  console.log("GroupSms status:", res?.GroupSmsResult?.Status, res);
})();